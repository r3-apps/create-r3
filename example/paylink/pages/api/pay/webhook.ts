import type { NextApiRequest, NextApiResponse } from 'next'
import api from "../[...remult]"
import { Payments } from 'src/shared/Payments'
import { Links } from 'src/shared/Links'
import { remult } from 'remult'

export default api.handle(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("=====[ START - WEBHOOK ] ===== ", req.body)
    const method = req.method
    const { data: { attributes: { data: resBody } } } = req.body;
    if (method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }

    const paidPayments = resBody.attributes.payments.filter((payment: any) => payment.data.attributes.status === "paid");

    const repoPay = remult!.repo(Payments);
    const repoLink = remult!.repo(Links)

    try {
       const data = await repoPay.insert({
            id: paidPayments[0].data.id,
            grossAmount: paidPayments[0].data.attributes.amount,
            netAmount: paidPayments[0].data.attributes.net_amount,
            fees: paidPayments[0].data.attributes.fee,
            source: paidPayments[0].data.attributes.source.type,
            billing: paidPayments[0].data.attributes.billing,
            reference_number: paidPayments[0].data.attributes.external_reference_number,
            link: resBody.id,
        });


       const existId = await repoLink.findId(resBody.id)

       if(existId.id){
        const linkUpdate = await repoLink.update(existId.id,{
            id: resBody.id,
            type: resBody.type,
            attributes: resBody.attributes,
        });
        res.status(200).json({ data , linkUpdate})

    }
        res.status(200).json({ data })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

})