import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("=====[ START - WEBHOOK ] ===== ", req.body)
    const method = req.method
    const { data: { attributes: { data: resBody } } } = req.body;
    if (method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }

    const supabase = createServerSupabaseClient<Database>({
        req,
        res,
    })

    const paidPayments = resBody.attributes.payments.filter((payment: any) => payment.data.attributes.status === "paid");

    try {
        const { data, error } = await supabase.from('payments').upsert([{
            id: paidPayments[0].data.id,
            grossAmount: paidPayments[0].data.attributes.amount,
            netAmount: paidPayments[0].data.attributes.net_amount,
            fees: paidPayments[0].data.attributes.fee,
            source: paidPayments[0].data.attributes.source.type,
            billing: paidPayments[0].data.attributes.billing,
            reference_number: paidPayments[0].data.attributes.external_reference_number,
            link: resBody.id,
        }]).select();


        if (error) {
            return res.status(500).json({ message: error })
        }

        const { data: links, error: error2 } = await supabase.from('links').upsert([{
            id: resBody.id,
            type: resBody.type,
            attributes: resBody.attributes,
        }]).select();

        if (error2) {
            return res.status(500).json({ message: error2 })
        }
        res.status(200).json({ data, links })

    } catch (error) {
        return res.status(500).json({ message: error })
    }







}