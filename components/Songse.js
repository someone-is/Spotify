import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { urlFor } from '../library/client'

function Songse({ music, songsSlug }) {
  const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
  const [isPlaying, setisPlaying] = useRecoilState(playstate);
  const setTrackTrackerin = useSetRecoilState(trackTrackerin);
  const setTrackTracker = useSetRecoilState(trackTracker);
  const settotaldata = useSetRecoilState(bottom);
  const setopacity = useSetRecoilState(visibility);
  const setcoverdata = useSetRecoilState(coverurl);
  const setClick2 = useSetRecoilState(click2);

  const selectSongs = (tracks, songs, covers) => {
    setactiveSong(tracks);
    settotaldata(songs);
    setcoverdata(covers);
  }

  const Play = () => {
    const Aslug = music.albumslug
    const Sslug = music.slug.current
    const ind = 0;
    const finder = songsSlug.findIndex(function (item) {
      console.log(item)
      if (item.slug.current === Aslug) {
        const infinder = item.song.findIndex(function (item) {
          return item.slug.current === Sslug
        })
        if (infinder !== undefined) {
          ind = infinder
        }
      }
      return item.slug.current === Aslug
    })

    if (finder === -1) {
      console.log("hu")
    } else {
      console.log("first")
      setTrackTracker(finder)
      setTrackTrackerin(ind)
    }
    selectSongs(music.track.id, music, music.thumbnail.id)
    setopacity("visible");
    if (ind !== songsSlug[finder]?.song.length - 1) {
      setClick2("yes");
    }
    if (music.track.id === activeSong) {
      setisPlaying(!isPlaying);
    }
  }
  return (
    <div className="leftabove">
      {music.length == 0 ? (<p></p>) : (<h1>Top Song</h1>)}
      <div className="topsearch">
        <div className={music.track.id === activeSong && isPlaying ? 'selectedtoptile' : 'toptile'}>
          <img src={urlFor(music?.thumbnail?.id)} className='Topimage' alt="" />
          <h3>{music?.name}</h3>
          <p>{music?.artists}<span>{music.length != 0 ? "Song" : "Album"}</span></p>
          {music.track.id === activeSong && isPlaying ? (
            <img className={music.track.id === activeSong && isPlaying ? 'selectedsearchGreenPlay' : 'searchGreenPlay'} src="/image/GreenPause.png" onClick={Play} alt="play" />
          ) : (
            <img className={music.track.id === activeSong && isPlaying ? 'selectedsearchGreenPlay' : 'searchGreenPlay'} src="/image/GreenPlay.png" onClick={Play} alt="pause" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Songse