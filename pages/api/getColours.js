// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../library/client";

export default async function GetColours(req, res) {
  const colour = `*[_type == "songs"]{cover {"id":asset->.metadata{"colour":palette}}}`;
  const colours = await client.fetch(colour);
  res.status(200).json({colours})
}