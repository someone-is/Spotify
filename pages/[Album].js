import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { client, urlFor } from '../library/client';
import Songtile from '../components/Songtile';
function Album({ song, colours, music }) {

  const router = useRouter()
  const { Album } = router.query;
  // console.log(Album)
  const album = Album.split("=");
  // console.log(album[1])
  // console.log(Album.split("="))
  // console.log(song)
  // console.log(colours.cover.id.colour.dominant.background);
  // console.log(music);
  // console.log(music.album)
  // console.log(music.artists)
  // console.log(music.song[0].name)
  // console.log(music.song[0].track.id)
  // console.log(SONG[1].name)
  // console.log(music.song)
  return (
    <>
      <div className="container" style={{ background: `linear-gradient(to bottom, ${colours.cover.id.colour.dominant.background}, #000000 45%)` }}>
        <Link href="/" >
          <div>
            {/* <h1 className='al'>{album[1]}</h1> */}
            <img className='navigationbutton' src="../image/back.png" alt="" width="35" />
          </div>
        </Link>
        <img className='Albumbigcover' src={urlFor(song.cover)} alt={song.name} />
        <div className="det">
          <div className="dettt">
            <h1 className='alname'>{song.album}</h1>
            <h2 className='arname'>{song.artists}</h2>
            {music.song?.map((item, tracker) => <Songtile key={item._id} album={album[0]} item={item} song={song} tracker={tracker} music={music} />)}

            {/* <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1>
            <h1>{song.album}</h1> */}
          </div>
        </div>
      </div>
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
  // const track = '*[_type == "songs"]{track[0] {"id":asset->.url}}';
  // const tracks = await client.fetch(track);
  const cover = '*[_type == "songs"]{cover {"id":asset->.url}}';
  const covers = await client.fetch(cover);
  const color = `*[_type == "songs" && slug.current=="${album[1]}"][0]{cover {"id":asset->.metadata{"colour":palette{dominant{background}}}}}`;
  const colours = await client.fetch(color);
  const pagesongs = `*[_type == "songs" && slug.current=="${album[1]}"][0]{_id,artists,album,cover{ "id":asset->.url},song[]->{_id,name,artists,album,duration,slug{current},track{"id":asset->.url}}}`;
  const music = await client.fetch(pagesongs);

  return {
    props: { song, songs, covers, colours, music }
  }
}
export default Album