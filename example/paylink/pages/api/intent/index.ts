
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const username = process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY;
    const password = '';
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    const method = req.method;

    if (method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const {amount} = req.body;


    const options = {
        method: 'POST',
        url: 'https://api.paymongo.com/v1/payment_intents',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: auth
        },
        data: {
            data: {
                attributes: {
                    amount: amount,
                    payment_method_allowed: ['atome', 'card', 'dob', 'paymaya', 'billease', 'gcash', 'grab_pay'],
                    payment_method_options: {card: {request_three_d_secure: 'any'}},
                    currency: 'PHP',
                    capture_type: 'automatic'
                }
            }
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}