import mongoose from 'mongoose'

export interface Users extends mongoose.Document {
  username: string
  email: string
  phone_num : number
  skillset: string[]
  hobby : string[]
  hiringStatus: any
}

const UserSchema = new mongoose.Schema<Users>({
  username: {
    type: String,
    required: [false, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [false, "Please provide the user's eamil address"],
    maxlength: [60, "Email cannot be more than 60 characters"],
  },
  phone_num: {
    type: Number,
    required: [false, 'Please specify the phone number of your user.'],
    maxlength: [10, 'Phonenum specified cannot be more than 10 characters'],
  },
  hobby: {
    type: [String],
  },
  skillset: {
    type: [String],
  },
})

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema)
