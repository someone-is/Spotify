import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { urlFor } from '../library/client'

function SearchAlbum({ songs, songsSlug }) {
  const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
  const [isPlaying, setisPlaying] = useRecoilState(playstate);
  const [TrackTrackerin, setTrackTrackerin] = useRecoilState(trackTrackerin);
  const setTrackTracker = useSetRecoilState(trackTracker);
  const settotalsongs = useSetRecoilState(bottom);
  const setopacity = useSetRecoilState(visibility);
  const setcoversongs = useSetRecoilState(coverurl);
  const setClick2 = useSetRecoilState(click2);
  const [fin, setfin] = useState("")


  const selectSongs = (tracks, songs, covers) => {
    setactiveSong(tracks);
    settotalsongs(songs);
    setcoversongs(covers);
  }
  // console.log(songs)
  const Play = () => {
    const Aslug = songs.slug.current
    const finder = songsSlug.findIndex(function (item) {
      // console.log(item)
      return item.slug.current === Aslug
    })

    if (finder === -1) {
      console.log("hu")
    } else {
      console.log("first")
      setTrackTracker(finder)
      setTrackTrackerin(0)
    }
    selectSongs(songs.song[0].track.id, songs.song[0], songs.cover.id)
    setopacity("visible");
    if (songs.song.length !== songsSlug[finder]?.song.length - 1) {
      setClick2("yes");
    }
    if (songs.song[0].track.id === activeSong) {
      setisPlaying(!isPlaying);
    }
  }

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

  const finding = () => {
    setfin(songs.slug.current)
  }
  const finder = songsSlug.findIndex(function (item) {
    return item.slug.current === fin
  })
  useEffect(() => {
    console.log("Hi")
    finding();
  }, [])

  return (
    <>
      {first ? (<div className={songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? "selectedsearchplateA activeborder" : "searchplateA"}>
        <div className="searchsmallplaypauseno">
          {/* {songs.track.id === activeSong && isPlaying ? (
            <Image src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
        ) : (
            <Image src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
        )} */}
          {/* <span>{tracker+1}</span> */}
          <div className="searching">
            {songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? (
              <Image className={songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'searchplaypause'} src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
            ) : (
              <Image className={songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'searchplaypause'} src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
            )}
            <img className={songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchcover' : 'searchcover'} src={urlFor(songs.cover)} alt={songs.name} width={45} height={45} />
          </div>
        </div>
        {/* <div className="thumb"> */}
        {/* <Image src={songs.cover.id} width={50} height={50}/> */}
        {/* </div> */}
        <Link href={"/" + `${finder}=` + songs.slug.current} key={songs.slug.current}>
          <div className={songs?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchSongandartistsA' : "searchSongandartistsA"}>
            <h3>{songs.name}</h3>
            <p>{songs.artists}</p>
          </div>
        </Link>

        {/* <p className="DURATION">{songs.duration}</p> */}

      </div>) : (<div className={songs.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? "selectedsearchtile" : "searchtile"}>
        <img className={songs.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? "selectedSearchbigcover" : "Searchbigcover"} src={urlFor(songs.cover)} alt="" />
        {songs.song[0].track.id === activeSong && isPlaying ? (
          <img className='SearchAGreenPlay' src="../image/GreenPause.png" onClick={Play} alt="play" />
        ) : (
          <img className='SearchAGreenPlay' src="../image/GreenPlay.png" onClick={Play} alt="pause" />
        )}
        <Link href={"/" + `${finder}=` + songs.slug.current} key={songs.slug.current}>
          <h1>{songs.album}</h1>
        </Link>
        <p>{songs.artists}</p>

      </div>
      )}
      {/* <div className='topone'>{songs.name}</div> */}
    </>
  )
}

export default SearchAlbum
