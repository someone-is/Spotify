import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { urlFor } from '../library/client'

function Albumse({ data, songsSlug }) {
  const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
  const [isPlaying, setisPlaying] = useRecoilState(playstate);
  const [TrackTrackerin, setTrackTrackerin] = useRecoilState(trackTrackerin);
  const setTrackTracker = useSetRecoilState(trackTracker);
  const settotaldata = useSetRecoilState(bottom);
  const setopacity = useSetRecoilState(visibility);
  const setcoverdata = useSetRecoilState(coverurl);
  const setClick2 = useSetRecoilState(click2);
  const [fin, setfin] = useState("")

  const selectSongs = (tracks, songs, covers) => {
    setactiveSong(tracks);
    settotaldata(songs);
    setcoverdata(covers);
  }
  const Play = () => {
    const Aslug = data.slug.current
    const finder = songsSlug.findIndex(function (item) {
      // console.log(item)
      return item.slug.current === Aslug
    })

    if (finder === -1) {
      console.log("hu")
    } else {
      console.log("first")
      setTrackTracker(finder)
    } if (data.song[TrackTrackerin]?.track.id === activeSong) {
      setTrackTrackerin(TrackTrackerin)
      selectSongs(data.song[TrackTrackerin].track.id, data.song[TrackTrackerin], data.cover.id)
    }
    else {
      setTrackTrackerin(0)
      selectSongs(data.song[0].track.id, data.song[0], data.cover.id)
    }
    setopacity("visible");
    if (data.song.length !== songsSlug[finder]?.song.length - 1) {
      setClick2("yes");
    }
    if (data.song[TrackTrackerin]?.track.id === activeSong) {
      setisPlaying(!isPlaying);
    }
  }

  const finding = () => {
    setfin(data.slug.current)
  }
  const finder = songsSlug.findIndex(function (item) {
    return item.slug.current === fin
  })
  useEffect(() => {
    finding();
  }, [])
  return (
    <div className="leftabove">
      {data.length == 0 ? (<p></p>) : (<h1>Top Search</h1>)}
      <div className="topsearch">
        <div className={data.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedtoptile' : 'toptile'}>
          <img src={urlFor(data?.cover)} className='Topimage' alt="" />
          <Link href={"/" + `${finder}=` + data.slug.current} key={data.slug.current}>
            <h3>{data?.name}</h3>
          </Link>

          <p>{data?.artists}<span>{data.length == 0 ? "Song" : "Album"}</span></p>
          {data.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? (
            <img className={data.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchGreenPlay' : 'searchGreenPlay'} src="/image/GreenPause.png" onClick={Play} alt="play" />
          ) : (
            <img className={data.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? 'selectedsearchGreenPlay' : 'searchGreenPlay'} src="/image/GreenPlay.png" onClick={Play} alt="pause" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Albumse


