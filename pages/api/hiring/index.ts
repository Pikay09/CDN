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
    case 'GET':
      try {
        const job = await Hiring.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: job })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const job = await Hiring.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: job })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // case 'DELETE':
    //   try {
    //     const deleteHiring = Hiring.findOneAndDelete({userid : id})
    //     if (!deleteHiring) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
      
    default:
      res.status(400).json({ success: false })
      break
  }
}
