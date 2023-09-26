import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Hiring from '../../../models/Hiring'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'DELETE':
      try {
        const deleteHiring = await Hiring.deleteOne({userid : id})
        if (!deleteHiring) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
      
    default:
      res.status(400).json({ success: false })
      break
  }
}
