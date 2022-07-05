/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.statusCode = 404;
        res.send(JSON.stringify({ message: "Please use with a slug" }));
    }
    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    });

    if (!data) {
        res.statusCode = 404;
        res.send(JSON.stringify({ message: "Slug not found" }));
        return;
    }

    return res.json(data);
};
