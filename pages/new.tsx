import UserForm from '../components/UserForm'

const NewUser = () => {
  const userForm = {
    username: '',
    email: '',
    phone_num: 0,
    skillset: [],
    hobby: []
  }

  return <div>
    <h2>Fill the form below to add a new developer</h2>
    <UserForm formId="add-user-form" userForm={userForm} />
  </div>
}

export default NewUser
