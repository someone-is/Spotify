import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SearchAlbum from '../components/SearchAlbum';
import Searchtile from '../components/Searchtile';
import { client, urlFor } from '../library/client';

function Search() {
  const [search, setsearch] = useState("");
  const [musicdata, setmusicdata] = useState([])
  const [data, setdata] = useState([])
  const searchingdata = async () => {
    if (search === "" || search === " " || search === "  ") {
      console.log(search)
      setdata([])
      setmusicdata([])
    }
    else {
      const song = `*[_type == "songs" && name match "*${search}*"]`;
      const songs = await client.fetch(song);
      const music = `*[_type == "music" && name match "*${search}*"]{...,thumbnail{"id":asset->.url}}`;
      const musics = await client.fetch(music);
      setdata(songs);
      setmusicdata(musics);
    }
  }
  useEffect(() => {
    searchingdata();
    console.log("music", musicdata)
    console.log("album", data)
    console.log(urlFor(data[0]?.cover))
  }, [search])

  const searching = (e) => {
    setsearch(e)
  }
  return (
    <>
      <div className='Searchbody'>
        <div className="searchbox">
          <Link href="/" >
            <div>
              <img className='navigationbutton' src="../image/back.png" alt="" width="35" />
            </div>
          </Link>
          <div className="textandbox">
            <h1>Search</h1>
            <div className="search-icon">
              <input type="text" className='Search' value={search} placeholder="What do you want to listen to ?" onChange={(e) => searching(e.target.value)} />
              <img src="search.svg" className='searchicon' alt="" />
            </div>
          </div>
        </div>

        {musicdata.length == 0 && data.length == 0 ?"":(
        <div className="above">
          <div className="leftabove">
           
          {musicdata.length == 0 && data.length == 0 ? (<p></p>) : (<h1>Top Search</h1>)}
          <div className="topsearch">
          <div className="toptile">
            <img src={urlFor(data[0]?.cover||musicdata[0]?.thumbnail?.id)} className='Topimage' alt="" />
            <h3>{data[0]?.name||musicdata[0]?.name}</h3>
            <p>{data[0]?.artists||musicdata[0]?.artists}<span>{data.length == 0 ? "Song":"Album"}</span></p>
            <img className='searchGreenPlay' src="../image/GreenPlay.png" alt="pause"/>
          </div>
          </div>
        </div>
        <div className="rightabove">
          {musicdata.length == 0 ? (<p></p>) : (<h1>Songs</h1>)}
          <div className="rightin">
            {/* {musicdata.splice(0, 5)?.map((music) => <h3 key={music.name}>{music.name}</h3>)} */}
            {musicdata.splice(0, 4)?.map((music) => <Searchtile key={music._id} music={music} />)}
          </div>
        </div>
        </div>
        )}
          
        {data.length == 0 ? "": (<h1 className='searchbottomh1'>Album</h1>)}
        {/* {data?.map((songs) => <h2 key={songs.name}>{songs.name}</h2>)} */}
        <div className="searchbottom">
        {data.splice(0,6).map((songs) => <SearchAlbum key={songs._id} songs={songs}/>)}
        </div>
      </div>
    </>
  )
}

export default Search