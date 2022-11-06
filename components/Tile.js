import React from 'react'
import { urlFor } from '../library/client'
import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';


function Tile({ songs, tracker, covers, music, colours }) {
  const [totaldata, settotaldata] = useRecoilState(bottom);
  // console.log(colours[tracker].cover.id.colour.dominant.background)
  // console.log(music[tracker])
  // console.log(totaldata)
  const [isPlaying, setisPlaying] = useRecoilState(playstate);
  const [activeSong] = useRecoilState(playingTrackState);
  const setopacity = useSetRecoilState(visibility);
  const setTrackTracker = useSetRecoilState(trackTracker);
  const [TrackTrackerin, setTrackTrackerin] = useRecoilState(trackTrackerin);
  const setClick2 = useSetRecoilState(click2);

  // console.log(songs.slug.current)
  const setactiveSong = useSetRecoilState(playingTrackState);
  const setcoverdata = useSetRecoilState(coverurl);

  const selectSongs = (tracks, songs, covers) => {
    setactiveSong(tracks);
    settotaldata(songs);
    setcoverdata(covers);
  }
  const Play = () => {
    setTrackTracker(tracker);
    if (music[tracker]?.song[TrackTrackerin]?.track.id === activeSong) {
      setTrackTrackerin(TrackTrackerin);
      selectSongs(music[tracker]?.song[TrackTrackerin]?.track.id, music[tracker].song[TrackTrackerin], covers[tracker].cover.id);
    }
    else {
      setTrackTrackerin(0)
      selectSongs(music[tracker]?.song[0]?.track.id, music[tracker].song[0], covers[tracker].cover.id);
    }
    // console.log(music[tracker].song[TrackTrackerin])
    // console.log(totaldata)
    setopacity("visible");
    if (tracker !== music.length - 1) {
      setClick2(1);
    }
    // console.log(music.length-1)
    // console.log(TrackTrackerin)
    // console.log(activeSong)
    // console.log(music[tracker]?.song[TrackTrackerin]?.track?.id)
    if (music[tracker]?.song[TrackTrackerin]?.track.id === activeSong) {
      setisPlaying(!isPlaying);
      // console.log(TrackTrackerin)
      // console.log(activeSong)
      // console.log(music[tracker]?.song[TrackTrackerin]?.track?.id)
    }
  }

  return (
    <>
      {/* <div className={tracks[tracker].track?.id === activeSong && isPlaying ? "selectedtile" : "tile"}> */}
      <div className={music[tracker]?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? "selectedtile" : "tile"}>
      <div className="hoverback"><div className="inhoverback"></div><div className="inin"></div></div>
        <img className={music[tracker]?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? "selectedcover" : "cover"} src={urlFor(songs.cover)} alt="" />
        {/* <audio src={tracks[tracker].track?.id} ref={audio} /> */}
        {music[tracker]?.song[TrackTrackerin]?.track.id === activeSong && isPlaying ? (
          <img className='GreenPlay' src="../image/GreenPause.png" alt="play" onClick={Play} />
        ) : (
          <img className='GreenPlay' src="../image/GreenPlay.png" alt="pause" onClick={Play} />
        )}
        <Link href={"/" + `${tracker}=` + songs.slug.current} key={songs.slug.current}>
          <h1>{songs.album}</h1>
        </Link>
        <p>{songs.artists}</p>
        {/* <p>{music[tracker].cover.id}</p> */}
        {/* <p>{music[tracker].song.track.id}</p> */}
        {/* {music?.map((music)=> <p>{music?.song?.track?.id}</p>)} */}
        {/* <p>{music[tracker].song.length}</p> */}
        {/* {music.map((music)=> <p key={music._id}>{music.song[0].album}</p> )}
       {music.map((music)=> <p key={music._id}>{music?.song[1]?.album}</p> )} */}
        {/* <p>{music[tracker].song[0].track.id}</p> */}
        {/* <p>{music[tracker]?.song[1]?.track?.id}</p> */}
        {/* <p>{audio.current.duration && tracks[tracker].track?.id === activeSong ? (duration) : ""} {audio.current.duration && tracks[tracker].track?.id === activeSong ? "/" : ""}  {audio.current.duration && tracks[tracker].track?.id === activeSong ? (totalDuration) : ""}</p> */}
      </div>
      <style jsx>
          {`
            @media (prefers-color-scheme: dark) {
              html {
                color-scheme: dark;
              }
              .tile:hover{
                background: ${colours[tracker].cover.id.colour.dominant.background}50;
              }
              .tile:hover .hoverback{
                background: ${colours[tracker].cover.id.colour.dominant.background}50;
                transition: background 5s;
              }
              .inhoverback{
                position: relative;
                background: linear-gradient(to bottom,${colours[tracker].cover.id.colour.dominant.background},black) ;
                transition: opacity 2s;
              }
              .selectedtile .hoverback{
                background: ${colours[tracker].cover.id.colour.dominant.background}92;
              }
              .selectedtile .inhoverback{
                background: linear-gradient(to bottom,${colours[tracker].cover.id.colour.dominant.background},black) ;
                opacity:1;
              }
            }
              @media (prefers-color-scheme: light) {
                html {
                  color-scheme: light;
                }
                .tile:hover{
                  background: ${colours[tracker].cover.id.colour.dominant.background}92;
                }
                .tile:hover .hoverback{
                  background: ${colours[tracker].cover.id.colour.dominant.background}92;
                  transition: background 5s;
                }
                .inhoverback{
                  position: relative;
                  background: linear-gradient(to bottom,${colours[tracker].cover.id.colour.dominant.background},white) ;
                  transition: opacity 2s;
                }
                .selectedtile .hoverback{
                  background: ${colours[tracker].cover.id.colour.dominant.background}92;
                }
                .selectedtile .inhoverback{
                  background: linear-gradient(to bottom,${colours[tracker].cover.id.colour.dominant.background},white) ;
                  opacity:1;
                }
              }
            
             `}

        </style>
    </>
  )
}

export default Tile




