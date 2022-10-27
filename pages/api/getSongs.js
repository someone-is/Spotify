// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../library/client";

export default async function GetSongs(req, res) {
  const query = '*[_type == "songs"]';
  const songs = await client.fetch(query);
  res.status(200).json({songs})
}
