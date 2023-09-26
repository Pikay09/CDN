import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import User, { Users } from '../models/User'
import HiringModal from '../components/HiringModal'
import { GetServerSideProps } from 'next'

type Props = {
  users: Users[]
}

const Index = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
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
              <p className="owner">Mobile No. : {user.phone_num}</p>
              <div className="likes info">
              <p className="label">Skills</p>
                <ul>
                  {user.skillset? user.skillset.map((data, index) => (
                    <li key={index}>{data} </li>
                  )): "no info"}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Hobbies</p>
                <ul>
                  {user.hobby? user.hobby.map((data, index) => (
                    <li key={index}>{data} </li>
                  )): "no info"}
                </ul>
              </div>

              <div className="btn-container">
              <HiringModal id={user._id} dev={user.username}/>
                <Link href={{ pathname: '/[id]', query: { id: user._id } }}>
                  <button className="btn view">Details</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/* Retrieves user(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  /* find all the data in our database */
  const result = await User.find({})

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const users = result.map((doc) => {
    const user = JSON.parse(JSON.stringify(doc))
    return user
  })

  return { props: { users: users } }
}

export default Index
