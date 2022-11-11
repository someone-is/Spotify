import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Albumse from '../components/Albumse';
import Artistspagetile from '../components/Artistspagetile';
import SearchAlbum from '../components/SearchAlbum';
import Searchtile from '../components/Searchtile';
import Songse from '../components/Songse';
import { client, urlFor } from '../library/client';

function Search({ songsSlug }) {
  const [search, setsearch] = useState("");
  const [musicdata, setmusicdata] = useState([]);
  const [data, setdata] = useState([]);
  const [artistdata, setartistdata] = useState([]);

  const router = useRouter()

  const searchingdata = async () => {
    if (search === "" || search === " " || search === "  ") {
      console.log(search)
      setdata([])
      setmusicdata([])
      setartistdata([])
    }
    else {
      const song = `*[_type == "songs" && name match "*${search}*"]{...,cover{...,"id":asset->.url},song[]->{_id,name,artists,album,slug{current},track{"id":asset->.url}}}`;
      const songs = await client.fetch(song);
      const music = `*[_type == "music" && name match "*${search}*"]{...,thumbnail{"id":asset->.url},track{"id":asset->.url},"relatedalbum": *[_type == "songs" && references(^._id)][0]{slug}}`;
      const musics = await client.fetch(music);
      const artist = `*[_type == "artists" && name match "*${search}*"]{...,profile{...,"id":asset->.metadata{"colour":palette}},"songs": *[_type == "music" && references(^._id)]{album,name,slug,artist[]->{name},thumbnail{"id":asset->.url},track{"id":asset->.url}}}`;
      const artists = await client.fetch(artist);
      setdata(songs);
      setmusicdata(musics);
      setartistdata(artists);
    }
  }
  useEffect(() => {
    searchingdata();
    console.log("album", data)
    console.log("music", musicdata)
    console.log(urlFor(data[0]?.cover))
    // console.log(songsSlug[0].slug.current, musicsSlug[0].slug.current)
  }, [search])

  const searching = (e) => {
    setsearch(e)
  }
  return (
    <>
      <div className='Searchbody'>
        <div className="searchbox">
          <div onClick={() => router.back()} >
            <img className='navigationbutton' src="../image/back.png" alt="" width="35" />
          </div>
          <div className="textandbox">
            <h1>Search</h1>
            <div className="search-icon">
              <input type="text" className='Search' value={search} placeholder="What do you want to listen to ?" onChange={(e) => searching(e.target.value)} />
              <img src="search.svg" className='searchicon' alt="" />
            </div>
          </div>
        </div>

        {musicdata.length == 0 && data.length == 0 ? "" : (
          <div className="above">
            {/* <div className="leftabove"> 
          {musicdata.length == 0 && data.length == 0 ? (<p></p>) : (<h1>Top Search</h1>)}
          <div className="topsearch">
          <div className="toptile">
            <img src={urlFor(data[0]?.cover||musicdata[0]?.thumbnail?.id)} className='Topimage' alt="" />
            <h3>{data[0]?.name||musicdata[0]?.name}</h3>
            <p>{data[0]?.artists||musicdata[0]?.artists}<span>{data.length == 0 ? "Song":"Album"}</span></p>
            <img className='searchGreenPlay' src="../image/GreenPlay.png" alt="pause" onClick={()=>{console.log(data[0]?.album,  musicdata[0]?.name)}}/>
          </div>
          </div>
        </div> */}

            {data.length != 0 ? (data.slice(0, 1)?.map((data) => <Albumse key={data._id} data={data} songsSlug={songsSlug} />)) : (musicdata.slice(0, 1)?.map((music) => <Songse key={music._id} music={music} songsSlug={songsSlug} />))}

            <div className="rightabove">
              {musicdata.length == 0 ? (<p></p>) : (<h1>Songs</h1>)}
              <div className="rightin">

                {musicdata.splice(0, 4)?.map((music) => <Searchtile key={music._id} music={music} songsSlug={songsSlug} />)}
              </div>
            </div>
          </div>
        )}

        {data.length == 0 ? "" : (<h1 className='searchbottomh1'>Album</h1>)}

        <div className="searchbottom">
          {data.splice(0, 6)?.map((songs) => <SearchAlbum key={songs._id} songs={songs} songsSlug={songsSlug} />)}
        </div>
{/* <p>{musicdata.length}  {data.length} {ar}</p> */}
        {artistdata.length == 0 ? "" : (<h1 className={musicdata.length == 0 && data.length == 0 ? "searchbottomartisth1" : "searchbottomh1"}>Artist</h1>)}
        <div className="searchbottomartist">
          {artistdata.splice(0, 6)?.map((artists, tracker) => <Artistspagetile key={artists._id} artists={artists} />)}
        </div>
      </div>
    </>
  )
}
export const getServerSideProps = async () => {
  const songSlug = `*[_type == "songs"]{song[]->{_id,slug{current}},slug{current}}`
  const songsSlug = await client.fetch(songSlug);

  return {
    props: { songsSlug }
  }
}
export default Search