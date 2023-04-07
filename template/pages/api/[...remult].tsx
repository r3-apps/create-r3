import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../src/server/api'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await api.handle(req, res);
}
export default handler