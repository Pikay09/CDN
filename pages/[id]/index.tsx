import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import User, { Users } from '../../models/User'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  user: Users
}

/* Allows you to view user card info and delete user card*/
const userPage = ({ user }: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const userID = router.query.id

    try {
      await fetch(`/api/users/${userID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the user.')
    }
  }

  return (
    <div key={user._id}>
      <div className="card">
        <h5 className="user-name">{user.username}</h5>
        <div className="main-content">
            <br/>
          <p className="user-name">
            Developer name is
            <br/>
            {user.username}</p>
            <br/>
          <p className="owner">Email : {user.email}</p>
          <p className="owner">Phone No. : {user.phone_num}</p>

          {/* Extra user Info: Hobby and Skillset */}
          <div className="likes info">
            <p className="label">Skills</p>
            <ul>
              {user.skillset? user.skillset.map((data, index) => (
                <li key={index}>{data} </li>
              )): "no info"}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Hobby</p>
            <ul>
              {user.hobby? user.hobby.map((data, index) => (
                <li key={index}>{data} </li>
              )): "no info"}
            </ul>
          </div>

          <div className="btn-container">
            <Link href={`/${user._id}/edit`}>
              <button className="btn edit">Edit User</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect()

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  const user = await User.findById(params.id).lean()

  if (!user) {
    return {
      notFound: true,
    }
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedUser = JSON.parse(JSON.stringify(user))

  return {
    props: {
      user: serializedUser,
    },
  }
}

export default userPage
