import Image from 'next/image'
import React from 'react'
import { urlFor } from '../library/client'

function Searchtile({music}) {
  return (
    // <div className='Searchtile'>
    //     <div className="searchname">
    //     {music.name}
    //     <p>{music.artists}</p>
    //     </div>
    //     </div>
    <div className="searchplate">
    <div className="searchsmallplaypauseno">
        {/* {music.track.id === activeSong && isPlaying ? (
            <Image src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
        ) : (
            <Image src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
        )} */}
        {/* <span>{tracker+1}</span> */}
        <div className="searching">
        <Image className='searchplaypause' src="/image/SmallPlay.png" width={20} height={20} alt="pause" />
        <img className='searchcover' src={urlFor(music?.thumbnail?.id)} alt={music.name} width={45} height={45}/>
        </div>
    </div>
    {/* <div className="thumb"> */}
        {/* <Image src={music.cover.id} width={50} height={50}/> */}
    {/* </div> */}
    <div className="searchSongandartists">
        <h3>{music.name}</h3>
        <p>{music.artists}</p>
    </div>
    <p className="DURATION">{music.duration}</p>

</div>


  )
}

export default Searchtile