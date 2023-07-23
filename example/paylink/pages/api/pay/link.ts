
import type { NextApiRequest, NextApiResponse } from 'next'
import { remult, } from "remult";
import { Links } from 'src/shared/Links';
remult.apiClient.url = `http://localhost:3000/api`

import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const username = process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY;
    const baseUrlPaymongo = 'https://api.paymongo.com/v1';
    const password = '';
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    const method = req.method;

    if (method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { amount, description, remarks } = req.body;

    console.log('Received data:', { amount, description, remarks });

    const options = {
        method: 'POST',
        url: `${baseUrlPaymongo}/links`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: auth
        },
        data: {
            data: {
                attributes: {
                    amount: amount * 100,
                    description: description,
                    remarks: remarks
                }
            }
        }
    };

    try {
        const response = await axios.request(options);
        console.log('Response from PayMongo:', response.data);

        const dataRes = response.data.data;
        const linkRepo = remult!.repo(Links);
       
        const data = await linkRepo.insert({
            id: dataRes.id,
            type: dataRes.type,
            attributes: dataRes.attributes,
        });

        console.log('Data inserted to database:', data);
        res.status(200).json(data);
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal Server Error', error: e.toString() });
    }
}
