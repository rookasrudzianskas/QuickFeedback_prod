// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {db} from "@/lib/firebase";
import {getAllFeedback, getSite} from "@/lib/db-admin";

export default async function handler(req, res) {
    const siteId = req.query.siteId;
    const { feedback, error } = await getAllFeedback(siteId);
    const { site } = await getSite(siteId);


    if(error) {
        res.status(500).json({ error: error });
    }
    res.status(200).json({ feedback, site });

};

