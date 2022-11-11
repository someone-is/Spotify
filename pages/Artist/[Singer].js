import { useRouter } from 'next/router'
import React from 'react'
import ArtistSongsPlate from '../../components/ArtistSongsPlate';
import { client } from '../../library/client';

function Singer({ artists , songsSlug}) {
  const router = useRouter();
  // const { Singer } = router.query;
  console.log(artists)
  return (
    <>
      <div className="mainpageartist">
        
      <div onClick={() => router.back()} >

<img className='navigationbutton' src="../image/back.png" alt="" width="35" />
</div>
        {/* <div>{Singer}</div> */}
        <div className="topsection">
          {/* <Image src={artists.profile.url} layout='fill' objectFit='cover' /> */}
          <img className='artistcover' src={artists.profile.url} alt="" />
        </div>
        <div className="bottomsection">
          <h1 className='singername'>{artists.name}</h1>
          <div className="artistsongplate">
            {artists.songs.map((AS,tracker)=><ArtistSongsPlate key={AS._id} tracker={tracker} AS={AS} songsSlug={songsSlug}/>)}
          </div>
        </div>
      </div>
      <style jsx>{`
      @media (prefers-color-scheme: light) {
        html {
          color-scheme: light;
        }
      
      .singername{
        background: linear-gradient(to bottom right , ${artists.profile.id.colour.darkVibrant.background} 50%, ${artists.profile.id.colour.lightVibrant.background});
        background-clip: text;
        color: transparent;
      }
    }
    @media (prefers-color-scheme: dark) {
      html {
        color-scheme: dark;
      }
    
    .singername{
      background: linear-gradient(to bottom right , ${artists.profile.id.colour.lightMuted.background} 40%, ${artists.profile.id.colour.lightVibrant.background});
      background-clip: text;
      color: transparent;
    }
  }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { Singer } = context.query
  const artist = `*[_type == "artists" && slug.current == "${Singer}"][0]{...,profile{...,"url":asset->.url,"id":asset->.metadata{"colour":palette}},"songs": *[_type == "music" && references(^._id)]{_id,"Album":*[_type == "songs" && references(^._id)][0]{slug},album,name,duration,slug,artists,artist[]->{name,slug},thumbnail{"id":asset->.url},track{"id":asset->.url}}}`;
  const artists = await client.fetch(artist);
  const songSlug = `*[_type == "songs"]{song[]->{_id,slug{current}},slug{current}}`
  const songsSlug = await client.fetch(songSlug);
  return {
    props: { artists,songsSlug }
  }
}

export default Singer




