
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import { remult, Remult } from "remult";
import { Blogs } from 'src/shared/Blog';
import { BlogController } from 'src/controllers/linkController';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
     const linksRepo = remult!.repo(Blogs)
    try {
        const data = await linksRepo.find()
        res.status(200).json(data)
       
    }catch (e) {
        console.log(e)
       
    }
}