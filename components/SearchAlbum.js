import React from 'react'
import { urlFor } from '../library/client'

function SearchAlbum({songs}) {
  return (
    <>
    {/* <div className='topone'>{songs.name}</div> */}
    <div className="tile">
        <img className="cover" src={urlFor(songs.cover)} alt="" />
        <img className='GreenPlay' src="../image/GreenPlay.png" alt="pause"/>
        {/* <Link href={"/"+`${tracker}=`+songs.slug.current} key={songs.slug.current}> */}
        <h1>{songs.album}</h1>
        {/* </Link> */}
        <p>{songs.artists}</p>
        
      </div>
    </>
  )
}

export default SearchAlbum