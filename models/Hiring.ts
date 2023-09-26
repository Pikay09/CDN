import mongoose from 'mongoose'

export interface Hirings extends mongoose.Document {
  companyName: string
  hourlyOffer: number
  isHired : boolean
  workDuration: number
  userid: string
  developerName: string
}

export const HiringSchema = new mongoose.Schema<Hirings>({
 companyName: {
    type: String,
    required: [false, 'Please provide a company name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  hourlyOffer: {
    type: Number,
    required: [false, "Please provide your per hour salary offer"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  isHired: {
    type: Boolean,
    required: [false, 'Please specify the species of your user.'],
    maxlength: [40, 'Species specified cannot be more than 40 characters'],
  },
  workDuration: {
    type: Number,
  },
  userid: {
    type: String, 
    required: true,
  },
  developerName: {
    type: String,
    required: true
  }
})

export default mongoose.models.Hiring || mongoose.model<Hirings>('Hiring', HiringSchema)
