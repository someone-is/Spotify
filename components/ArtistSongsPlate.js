import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bottom, click2, coverurl, playingfrom, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';

function ArtistSongsPlate({ AS , songsSlug, tracker}) {
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
        setPlayingFrom("artist")
        const Aslug = AS.Album.slug.current
        const Sslug = AS.slug.current
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
        selectSongs(AS.track.id, AS, AS.thumbnail.id)
        setopacity("visible");
        if (ind !== songsSlug[finder]?.song.length - 1) {
            setClick2("yes");
        }
        if (AS.track.id === activeSong) {
            setisPlaying(!isPlaying);
        }
    }
    const Play = () => {
        const Aslug = AS.Album.slug.current
        const Sslug = AS.slug.current
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
        selectSongs(AS.track.id, AS, AS.thumbnail.id)
        setopacity("visible");
        if (ind !== songsSlug[finder]?.song.length - 1) {
            setClick2("yes");
        }
        if (AS.track.id === activeSong) {
            setisPlaying(!isPlaying);
        }
    }
  return (
    <>
      {first ? (<div className={AS.track.id === activeSong && isPlaying ? "selectedsearchplate activeborder" : "searchplate"}>
        <div className="searchsmallplaypauseno">

          {/* <span>{tracker+1}</span> */}
          <div className="searching">
            {AS.track.id === activeSong && isPlaying ? (
              <Image className={AS.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'searchplaypause'} src="/image/SmallPause.png" width={20} height={20} onClick={Play} alt="play" />
            ) : (
              <Image className={AS.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'searchplaypause'} src="/image/SmallPlay.png" width={20} height={20} onClick={Play} alt="pause" />
            )}
            <img className={AS.track.id === activeSong && isPlaying ? 'selectedsearchcover' : 'searchcover'} src={AS.thumbnail.id} alt={AS.name} width={45} height={45} />
          </div>
        </div>
        {/* <div className="thumb"> */}
        {/* <Image src={AS.cover.id} width={50} height={50}/> */}
        {/* </div> */}
        <div className={AS.track.id === activeSong && isPlaying ? 'selectedsearchSongandartists' : "searchSongandartists"} onClick={first ? Playtile : (console.log("first"))}>
          <h3>{AS.name}</h3>
          <p>{AS.artists}</p>
        </div>
        <p className={AS.track.id === activeSong && isPlaying ? "SELECTEDDURATION" : "DURATION"}>{AS.duration}</p>

      </div>
      ) : (
        <div className={AS.track.id === activeSong && isPlaying ? "Artistsongpplate activeborder" : "Artistsongpplate"}>
          <div className={AS.track.id === activeSong && isPlaying ? 'selectednumber' : 'number'} onClick={Play}>
          {AS.track.id === activeSong && isPlaying ? (
              <img className={AS.track.id === activeSong && isPlaying ? 'selectednumsmall' : 'numsmall'} src="/image/SmallPause.png" width={23} height={23} onClick={Play} alt="play" />
            ) : (
              <img className={AS.track.id === activeSong && isPlaying ? 'selectednumsmall' : 'numsmall'} src="/image/SmallPlay.png" width={23} height={23} onClick={Play} alt="pause" />
            )}
          <p>{tracker+1}</p>
          </div>
          <div className="Artistsongcover">
            {/* {AS.track.id === activeSong && isPlaying ? (
              <Image className={AS.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'Artistsmall searchplaypause'} src="/image/SmallPause.png" width={23} height={23} onClick={Play} alt="play" />
            ) : (
              <Image className={AS.track.id === activeSong && isPlaying ? 'selectedsearchplaypause' : 'Artistsmall searchplaypause'} src="/image/SmallPlay.png" width={23} height={23} onClick={Play} alt="pause" />
            )} */}
            <img className={AS.track.id === activeSong && isPlaying ? 'selectedArtistThumb' : 'ArtistThumb'} src={AS.thumbnail.id} alt="" height={100} width={100} />
          </div>
          <div className="nameandartistinsartist">
            <h3 className={AS.track.id === activeSong && isPlaying ? "selectedmusicartistname":'musicartistname'}>{AS.name}</h3>
            <p className="artistinartist">
              {AS.artist.map((artist, index) => 
              <span key={artist.name}>
                <span>{index === 0 ? (" ") : (index === AS.artist.length - 1 ? (<span className='joinand'>&</span>) : (<span className='joinand'>,</span>))}</span>
                <span className={`Seprateartist ${index === AS.artist.length - 1 ? "truncate" : ""}`}> 
                <Link href={"/Artist/" + artist.slug.current} key={artist.slug.current} replace>{artist.name}</Link>
                </span></span>)}
            </p>
          </div>
          <div className="artistalcontainer">
          <div className={AS.track.id === activeSong && isPlaying ? 'selectedsearchSongandartists ' : "searchSongandartists "}><h3>{AS.album}</h3></div>
          </div>
          <p className={AS.track.id === activeSong && isPlaying ? "SELECTEDDURATION" : "DURATION"}>{AS.duration}</p>
        </div>)}



    </>
  )
}

export default ArtistSongsPlate