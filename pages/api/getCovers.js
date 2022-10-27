// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../library/client";

export default async function GetSongs(req, res) {
  const cover = '*[_type == "songs"]{cover {"id":asset->.url}}';
  const covers = await client.fetch(cover);
  res.status(200).json({covers})
}
