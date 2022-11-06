import React from 'react'
import { useRouter } from 'next/router'
import { client, urlFor } from '../library/client';
import Songtile from '../components/Songtile';
function Album({ song, colours, music }) {

  const router = useRouter()
  const { Album } = router.query;

  const album = Album.split("=");
  console.log(colours)

  return (
    <>
      <div className="container">

        <div onClick={() => router.back()} >

          <img className='navigationbutton' src="../image/back.png" alt="" width="35" />
        </div>

        <img className='Albumbigcover' src={urlFor(song.cover)} alt={song.name} />
        <div className="det">
          <div className="dettt">
            <h1 className='alname'>{song.album}</h1>
            <h2 className='arname'>{song.artists}</h2>
            {music.song?.map((item, tracker) => <Songtile key={item._id} album={album[0]} item={item} song={song} tracker={tracker} music={music} />)}

          </div>
        </div>
      </div>
      <style jsx>{`
      
       .container{
      background: linear-gradient(to bottom, ${colours.cover.id.colour.dominant.background}, #000000 45%);
       }
      @media (prefers-color-scheme: light) {
  html {
    color-scheme: light;
  }
  .dettt {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0)2%, white 30%);
  }
  .container{
    background:linear-gradient(to bottom, ${colours.cover.id.colour.lightVibrant.background}, ${colours.cover.id.colour.lightVibrant.background}00 45%)
  }
}
  `}</style>
    </>
  )
}
export const getServerSideProps = async (context) => {
  const { Album } = context.query
  const album = Album.split("=");
  const page = `*[_type == "songs" && slug.current=="${album[1]}"][0]`;
  const song = await client.fetch(page);
  const query = '*[_type == "songs"]';
  const songs = await client.fetch(query);
  const cover = '*[_type == "songs"]{cover {"id":asset->.url}}';
  const covers = await client.fetch(cover);
  const color = `*[_type == "songs" && slug.current=="${album[1]}"][0]{cover {"id":asset->.metadata{"colour":palette}}}`;
  const colours = await client.fetch(color);
  const pagesongs = `*[_type == "songs" && slug.current=="${album[1]}"][0]{_id,artists,album,cover{ "id":asset->.url},song[]->{_id,name,artists,album,duration,slug{current},track{"id":asset->.url}}}`;
  const music = await client.fetch(pagesongs);

  return {
    props: { song, songs, covers, colours, music }
  }
}
export default Album