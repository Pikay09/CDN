import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import PhoneInput from 'react-phone-number-input/input'


interface FormData {
  username: string
  email: string
  phone_num : number
  skillset: string[]
  hobby : string[]
}

interface Error {
  name?: string
  phone_num?: string
  email?: string
  skillset?: string
}

type Props = {
  formId: string
  userForm: FormData
  forNewUser?: boolean
}

const UserForm = ({ formId, userForm, forNewUser = true }: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    username: userForm.username,
    phone_num : userForm.phone_num,
    email: userForm.email,
    skillset: userForm.skillset,
    hobby: userForm.hobby
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/users/${id}`, {
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

      mutate(`/api/users/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update user')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch('/api/users', {
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
      target.name === 'checker'
        ? (target as HTMLInputElement).checked
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure user info is filled for user name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {}
    if (!form.username) err.name = 'Name is required'
    if (!form.phone_num) err.phone_num = 'Email is required'
    if (!form.email) err.email = 'Email is required'
    if (!form.skillset) err.skillset = 'Atleast 1 skillset is required'
    return err
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()

    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name</label>
        <input
          type="text"
          maxLength={20}
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder='example : John Smith'
          required
        />

        <label htmlFor="phone_num">Contact Number</label>
        <input
          type="number"
          maxLength={10}
          minLength={9}
          name="phone_num"
          value={form.phone_num}
          onChange={handleChange}
          placeholder='+60123456789'
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          maxLength={30}
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder='exampl@web.com'
          required
        />

        <label htmlFor="skills">Skills</label>
        <input
          type="text"
          name="skillset"
          value={form.skillset}
          onChange={handleChange}
          placeholder='Coding, Desiging, Painting'
        />

        <label htmlFor="hobby">Hobby</label>
        <input
          type="text"
          name="hobby"
          value={form.hobby}
          onChange={handleChange}
          placeholder='cleaning, singing, hiking'
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

export default UserForm
