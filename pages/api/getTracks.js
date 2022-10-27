// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../library/client";

export default async function GetTracks(req, res) {
  const track = '*[_type == "songs"]{track[0] {"id":asset->.url}}';
  const tracks = await client.fetch(track);
  res.status(200).json({tracks})
}
