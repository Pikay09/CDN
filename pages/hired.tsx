
import dbConnect from '../lib/dbConnect'
import Hiring, {Hirings} from '../models/Hiring'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

type Props = {
    jobs: Hirings[]
}

const Hired = ({ jobs }: Props) => {

    const router = useRouter()
    const [data, setData] = useState(jobs)
    const [message, setMessage] = useState('')

    const handleDelete = async (userid: string) => {
        const userID = userid
        try {
          const res = await fetch(`/api/hiring/${userID}`, {
            method: 'Delete',
          })
          if(res.ok){
            router.push('/')
          }
        } catch (error) {
          setMessage('Failed to delete the record.')
        }
      }

  return (
    <>
      {data.map((hiring) => (
        <div  key={hiring._id}>
          <div className="card">
            {hiring.isHired? 
              <img
              className='' 
              src='https://cdn-icons-png.flaticon.com/512/1412/1412222.png'
              width={200} height={200}/>:
               <img
               className='' 
               src='https://cdn.dribbble.com/users/10971/screenshots/2876534/media/b31598eed7a881eb67c93562118b9844.gif'
                width={500} height={500}/>}
            <div className="main-content">
                <br/>
                <br/>
                <br/>
              <p className="user-name parent-card"> 
                {hiring.companyName} is hiring
                <br/>
                {hiring.developerName}
                </p>
                <br/>
                <p>Duration of contract: {hiring.workDuration} hours</p>
                <p>Estimated Salary : ${hiring.hourlyOffer}</p>
                <p></p>
                <br/>
                <br/>
                {hiring.isHired? <p>Hired for work</p>: <p>Waiting for confirmation</p>}
                <br/>
              <button onClick={()=>{handleDelete(hiring.userid)}} className='btn delete'>Delete Job</button>
            </div>
            {message && <p>{message}</p>}
          </div>
        </div>
      ))}
    </>
  )
}

/* Retrieves user(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  const result = await Hiring.find({})

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const jobs = result.map((doc) => {
    const jobs = JSON.parse(JSON.stringify(doc))
    return jobs
  })

  return { props: { jobs: jobs } }
}

export default Hired
