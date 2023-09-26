import { useRouter } from 'next/router'
import useSWR from 'swr'
import UserForm from '../../components/UserForm'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditUser = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(id ? `/api/users/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!user) return null

  const userForm = {
    username: user.username,
    email: user.email,
    phone_num: user.phone_num,
    skillset: user.skillset,
    hobby: user.hobby
  }

  return <UserForm formId="edit-user-form" userForm={userForm} forNewUser={false} />
}

export default EditUser
