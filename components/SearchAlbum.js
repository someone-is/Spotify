import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../library/client'

function SearchAlbum({songs}) {
  const [first, setfirst] = useState(false)
  const [width, setwidth] = useState()
  const detectSize = () => {
    setwidth(window.innerWidth)
}
  useEffect(() => {
    window.addEventListener('resize', detectSize)
    if (window.innerWidth <= 600) {
        setfirst(true)
    }
    else {
        setfirst(false)
    }
    return () => {
        window.removeEventListener('resize', detectSize)
    }
}, [width])

  return (
    <>
    {first?( <div className="searchplate">
    <div className="searchsmallplaypauseno">
        {/* {songs.track.id === activeSong && isPlaying ? (
            <Image src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
        ) : (
            <Image src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
        )} */}
        {/* <span>{tracker+1}</span> */}
        <div className="searching">
        <Image className='searchplaypause' src="/image/SmallPlay.png" width={20} height={20} alt="pause" />
        <img className='searchcover' src={urlFor(songs.cover)} alt={songs.name} width={45} height={45}/>
        </div>
    </div>
    {/* <div className="thumb"> */}
        {/* <Image src={songs.cover.id} width={50} height={50}/> */}
    {/* </div> */}
    <div className="searchSongandartists">
        <h3>{songs.name}</h3>
        <p>{songs.artists}</p>
    </div>
    {/* <p className="DURATION">{songs.duration}</p> */}

</div>):(<div className="tile">
        <img className="cover" src={urlFor(songs.cover)} alt="" />
        <img className='GreenPlay' src="../image/GreenPlay.png" alt="pause"/>
        {/* <Link href={"/"+`${tracker}=`+songs.slug.current} key={songs.slug.current}> */}
        <h1>{songs.album}</h1>
        {/* </Link> */}
        <p>{songs.artists}</p>
        
      </div>
    )}
    {/* <div className='topone'>{songs.name}</div> */}
    </>
  )
}

export default SearchAlbum