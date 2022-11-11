import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingfrom, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { urlFor } from '../library/client'

function Searchtile({ music, songsSlug }) {
console.log(music.relatedalbum.slug.current)
    const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
    const [isPlaying, setisPlaying] = useRecoilState(playstate);
    const setTrackTrackerin = useSetRecoilState(trackTrackerin);
    const setTrackTracker = useSetRecoilState(trackTracker);
    const settotaldata = useSetRecoilState(bottom);
    const setopacity = useSetRecoilState(visibility);
    const setcoverdata = useSetRecoilState(coverurl);
    const setClick2 = useSetRecoilState(click2);
    const [PlayingFrom, setPlayingFrom] = useRecoilState(playingfrom);

    // const [Aindex, setAindex] = useState(0)
    // const [Sindex, setSindex] = useState(0)

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

    const selectSongs = (tracks, songs, covers) => {
        setactiveSong(tracks);
        settotaldata(songs);
        setcoverdata(covers);
    }
    const Playtile = () => {
        setPlayingFrom("search")
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

        // console.log(ind)
        // console.log(finder)
        // setTrackTracker(finder)
        // setTrackTrackerin(infinder)
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
    const Play = () => {
        const Aslug = music.relatedalbum.slug.current
        const Sslug = music.slug.current
        const ind = 0;
        const finder = songsSlug.findIndex(function (item) {
            // console.log(item)
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

        // console.log(ind)
        // console.log(finder)
        // setTrackTracker(finder)
        // setTrackTrackerin(infinder)
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
        // <div className='Searchtile'>
        //     <div className="searchname">
        //     {music.name}
        //     <p>{music.artists}</p>
        //     </div>
        //     </div>
        <div className={music.track.id === activeSong && isPlaying ?"selectedsearchplate activeborder":"searchplate"}>
            <div className="searchsmallplaypauseno">

                {/* <span>{tracker+1}</span> */}
                <div className="searching">
                    {music.track.id === activeSong && isPlaying ? (
                        <Image className={music.track.id === activeSong && isPlaying ?'selectedsearchplaypause':'searchplaypause'} src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
                    ) : (
                        <Image className={music.track.id === activeSong && isPlaying ?'selectedsearchplaypause':'searchplaypause'} src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
                    )}
                    <img className={music.track.id === activeSong && isPlaying ?'selectedsearchcover':'searchcover'} src={urlFor(music?.thumbnail?.id)} alt={music.name} width={45} height={45} />
                </div>
            </div>
            {/* <div className="thumb"> */}
            {/* <Image src={music.cover.id} width={50} height={50}/> */}
            {/* </div> */}
            <div className={music.track.id === activeSong && isPlaying ?'selectedsearchSongandartists':"searchSongandartists"} onClick={first ? Playtile : (console.log("first"))}>
                <h3>{music.name}</h3>
                <p>{music.artists}</p>
            </div>
            <p className={music.track.id === activeSong && isPlaying ?"SELECTEDDURATION":"DURATION"}>{music.duration}</p>

        </div>


    )
}

export default Searchtile


