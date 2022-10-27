// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../library/client";

export default async function GetMusics(req, res) {
  const music = `*[_type == "songs"]{_id,artists,album,cover{ "id":asset->.url},song[]->{name,artists,album,slug{current},track{"id":asset->.url}}}`;
  const musics = await client.fetch(music);
  res.status(200).json({musics})
}