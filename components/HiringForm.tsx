import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'


interface FormData {
  companyName: string
  hourlyOffer: number
  isHired : boolean
  workDuration: number
}

interface Error {
  name?: string
  phone_num?: string
  email?: string
  skillset?: string
}

type Props = {
    userid: string
    closeModal: any
    dev: string
}

const HiringForm = ({userid, closeModal, dev}:Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    companyName: "",
    hourlyOffer: 20,
    isHired : true,
    workDuration: 1,
    userid: userid,
    developerName: dev
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const id = userid
    console.log(userid)

    try {
      const res = await fetch(`/api/hiring/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/hiring/${id}`, data, true) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update user')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch('/api/hiring', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add user')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value =
      target.name === 'isHired'
        ? (target as HTMLInputElement).checked
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure user info is filled for user name, owner name, species, and image url*/
//   const formValidate = () => {
//     let err: Error = {}
//     if (!form.username) err.name = 'Name is required'
//     if (!form.phone_num) err.phone_num = 'Email is required'
//     if (!form.email) err.email = 'Email is required'
//     if (!form.skillset) err.skillset = 'Atleast 1 skillset is required'
//     return err
//   }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const errs = formValidate()
    // form.companyName === "" ? postData(form) : putData(form)
     await postData(form)
     closeModal()
  }

  return (
    <>
      <form id={"hiring-form"} onSubmit={handleSubmit}>
        <label 
        className='dark-label'
        htmlFor="companyName"
        >Company Name</label>
        <input
          type="text"
          maxLength={30}
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder='Company Name'
          required
        />

        <label 
        className='dark-label'
        htmlFor="hourlyOffer"
        >Hourly Offer</label>
        <input
          type="number"
          maxLength={20}
          name="hourlyOffer"
          value={form.hourlyOffer}
          onChange={handleChange}
          placeholder='Pay in $ / hour'
          required
        />

        <label 
        className='dark-label'
        htmlFor="isHired"
        >Hired?</label>
        <input
          type="checkbox"
          maxLength={30}
          name="isHired"
          checked={form.isHired}
          onChange={handleChange}
        />

        <label 
        className='dark-label'
        htmlFor="workDuration"
        >Work Duration</label>
        <input
          type="number"
          name="workDuration"
          value={form.workDuration}
          onChange={handleChange}
          placeholder='1'
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default HiringForm
