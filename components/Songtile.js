import Image from 'next/image';
import React from 'react'
import { useRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { urlFor } from '../library/client';

function Songtile({item,tracker,song,music,album}) {

    const [isPlaying, setisPlaying] = useRecoilState(playstate);
    const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
    const [totaldata, settotaldata] = useRecoilState(bottom);
    const [coverdata, setcoverdata] = useRecoilState(coverurl);
    const [TrackTracker, setTrackTracker] = useRecoilState(trackTracker);
    const [TrackTrackerin, setTrackTrackerin] = useRecoilState(trackTrackerin);
  const [opacity, setopacity] = useRecoilState(visibility);
  const [Click2, setClick2] = useRecoilState(click2);


// console.log(item.track.id);
// console.log(item);
// console.log(tracker)
    const selectSongs = (tracks, songs, covers) => {
        setactiveSong(tracks);
        settotaldata(songs);
        setcoverdata(covers);
    }
    // console.log(song)
    // console.log(totaldata)
    // console.log(music.song[tracker])
    // console.log(coverdata)
    // console.log(item.slug.current)
    const Play = () => {
        selectSongs(item.track.id, music.song[tracker],music.cover.id);
        // console.log(item.track.id)
        // console.log(totaldata)
        if (tracker !== music.song.length-1) {
            setClick2("yes");
        }
        // console.log(music.song.length)
        // console.log(music.song[tracker])
        setTrackTrackerin(tracker);
        setTrackTracker(album)
        // console.log(tracker)
        // console.log(TrackTrackerin)
        setopacity("visible");
        // console.log(song.cover);
        // console.log(coverdata)
        if (item.track.id === activeSong) {
          setisPlaying(!isPlaying);
        }
    }
    return (
        <>
            <div className={item.track.id === activeSong && isPlaying ?"plate activeborder":"plate"}>
                <div className="smallplaypauseno">
                    {item.track.id === activeSong && isPlaying ? (
                        <Image src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play"/>
                    ) : (
                        <Image src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause"/>
                    )}
                     {/* <span>{tracker+1}</span> */}
                </div>
                <div className="thumb">
                {/* <Image src={music.cover.id} width={50} height={50}/> */}
        {/* <img src={urlFor(song.cover)} alt={song.name} width={50} height={50}/> */}

                </div>
                <div className="Songandartists">
                    <h3 className={item.track.id === activeSong && isPlaying ?"selectedmusic":""}>{item.name}</h3>
                    <p>{item.artists}</p>
                </div>
                <p className={item.track.id === activeSong && isPlaying ?"DURATION selectedmusic":"DURATION"}>{item.duration}</p>

            </div>
        </>
    )
}

export default Songtile