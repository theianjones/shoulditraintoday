// ./pages/api/login
import {NextApiRequest, NextApiResponse} from 'next'
import {setAuthCookies} from 'next-firebase-auth'
import initAuth from 'utils/firebase/initAuth' // the module you created above

initAuth()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({error: 'Unexpected error.'})
  }
  return res.status(200).json({success: true})
}

export default handler
