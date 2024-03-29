import React, { useEffect, useState } from 'react'
// import {  useSetRecoilState } from 'recoil';
import { fetchSongs } from '../Utilities/FetchSongs';
// import Tile from '../components/Tile'
// import { bottom, coverurl, playingTrackState} from '../feature/PlayerAtom';
import { client } from '../library/client'
import MainComponent from '../components/MainComponent';

function Index({ songs, covers, music, colours, artists }) {

  const [greetings, setGreetings] = useState("Good Morning");

  const updateTime = () => {
    let time = new Date();
    var curHr = time.getHours()
    if (curHr < 17) {
      return
    }
    else {
      setGreetings("Good Evening")
    }
  }
  setInterval(updateTime, 600000);

  useEffect(() => {
    updateTime()
  })
console.log(artists)
  return (
    <>
      <div className="maincontainer">
        <div className="greetings">
          <h1>{greetings}</h1>
        </div>
        <MainComponent songs={songs} music={music} covers={covers} colours={colours} artists={artists}/>
        {/* <div className="gaane">
        {songs?.map((songs, tracker) => <Tile key={songs._id} songs={songs} music={music} tracker={tracker} covers={covers} colours={colours} />)}
      </div> */}
        {/* <div>index</div> */}
        {/* <a href="https://iconscout.com/icons/spotify" target="_blank">Spotify Logo Icon</a> by <a href="https://iconscout.com/contributors/alexis-doreau">Alexis Doreau</a> on <a href="https://iconscout.com">IconScout</a> */}
      </div>
    </>
  )
}
export const getServerSideProps = async () => {
  // const query = '*[_type == "songs"]';
  // const songs = await client.fetch(query);
  const songs = await fetchSongs();
  // const track = '*[_type == "songs"]{track[0] {"id":asset->.url}}';
  // const tracks = await client.fetch(track);
  const cover = '*[_type == "songs"]{cover {"id":asset->.url}}';
  const covers = await client.fetch(cover);
  const pagesongs = `*[_type == "songs"]{_id,artists,album,cover{ "id":asset->.url},song[]->{_id,name,artists,album,slug{current},track{"id":asset->.url}}}`;
  const music = await client.fetch(pagesongs);
  const color = `*[_type == "songs"][]{cover {"id":asset->.metadata{"colour":palette{dominant{background}}}}}`;
  const colours = await client.fetch(color);
  const artist = `*[_type == "artists"]{...,profile{...,"id":asset->.metadata{"colour":palette}},"songs": *[_type == "music" && references(^._id)]{name}}`;
  const artists = await client.fetch(artist);
  return {
    props: { songs, covers, music, colours, artists}
  }
}
export default Index
