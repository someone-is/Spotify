import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allmusic, bottom, click2, coverurl, musicCover, musicin, opening, photo, playingfrom, playingTrackState, playstate, trackTracker, trackTrackerin, visibility } from '../feature/PlayerAtom';
import { shuffle } from 'lodash';
import { fetchSongs } from '../Utilities/FetchSongs';
import { fetchTracks } from '../Utilities/FetchTracks';
import { fetchCovers } from '../Utilities/FetchCovers';
import { fetchMusics } from '../Utilities/FetchMusics';
import { fetchColours } from '../Utilities/FetchColours';
function Controller() {

    const setTracks = useSetRecoilState(photo);
    const [songs, setSongs] = useRecoilState(allmusic);
    const [covers, setCovers] = useRecoilState(musicCover);
    const [music, setMusic] = useRecoilState(musicin);
    const [PlayingFrom, setPlayingFrom] = useRecoilState(playingfrom);
    const [TrackTrackerin, setTrackTrackerin] = useRecoilState(trackTrackerin);
    const [colours, setcolours] = useState([])
    const fetchdata = async () => {
        const song = await fetchSongs();
        const track = await fetchTracks();
        const cover = await fetchCovers();
        const musics = await fetchMusics();
        const colour = await fetchColours();
        setSongs(song);
        setTracks(track);
        setCovers(cover);
        setMusic(musics);
        console.log("hiii", colour[TrackTracker]?.cover?.id?.colour?.darkVibrant?.background)
        setcolours(colour);
        // console.log(colour)
        //   console.log(music)
        //   console.log(covers)
        //   console.log(tracks)
    }
    useEffect(() => {
        fetchdata();
    }, [])

    const [isPlaying, setisPlaying] = useRecoilState(playstate);
    const [TrackTracker, setTrackTracker] = useRecoilState(trackTracker);
    const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
    const [totaldata, settotaldata] = useRecoilState(bottom);
    const [coverdata, setcoverdata] = useRecoilState(coverurl);
    const [Click2, setClick2] = useRecoilState(click2);
    const [opacity] = useRecoilState(visibility);
    const [open, setopen] = useRecoilState(opening)

    const [clicked, setclicked] = useState(true);
    const [mix, setmix] = useState(false);
    const [duration, setduration] = useState("0:00");
    const [totalDuration, setTotalDuration] = useState("0:00");
    const [progress, setprogress] = useState("0");
    const [Tap, setTap] = useState(0);
    const [Bar, setBar] = useState('');
    const [Repeat, setRepeat] = useState(false);
    const [prev, setprev] = useState(true)
    const [width, setwidth] = useState()
    const [first, setfirst] = useState(false)
    const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const audio = useRef();
    const time = useRef();

    const detectSize = () => {
        setwidth(window.innerWidth)
    }

    const selectSongs = (tracks, songs, covers) => {
        setactiveSong(tracks);
        settotaldata(songs);
        setcoverdata(covers);
        console.log("SELECTING")
    }
    const expand = () => {
        setopen(!open)
    }
    const seeking = (e) => {
        if (activeSong) {
            audio.current.currentTime = (e * audio.current.duration) / 1000;
        }
    }
    const shuffl = () => {
        shuffle(index);
        setmix(!mix)
    }
    const repeat = () => {
        setRepeat(!Repeat)
        console.log(Repeat)
    }
    // console.log("A", TrackTracker,TrackTrackerin)

    const next = () => {
        console.log("on next", TrackTrackerin, TrackTracker, Repeat)
        setClick2(1)
        if (Repeat) {
            audio.current.currentTime = 0;
            setTrackTracker(TrackTracker)
            setTrackTrackerin(TrackTrackerin)
            setisPlaying(true)
            console.log("repeat", TrackTrackerin, TrackTracker)
            audio.current.play();
            return
        }
        else {
            if (TrackTrackerin !== music[TrackTracker].song.length - 1) {
                setTrackTrackerin(++TrackTrackerin);
                console.log("when increasing", TrackTrackerin, TrackTracker)
            }
            else {
                setTrackTrackerin(0);
                console.log("when setting 0", TrackTrackerin, TrackTracker)
                if (TrackTracker !== songs.length - 1) {
                    setTrackTrackerin(0);
                    setTrackTracker(++TrackTracker);
                    // console.log("second")
                    console.log("when SONG is increasing", TrackTrackerin, TrackTracker)
                }
                else {
                    setTrackTrackerin(0);
                    setTrackTracker(0);
                    console.log("when SONG is max", TrackTrackerin, TrackTracker)

                    // console.log("first")
                }
                // console.log("third")
                // console.log(songs.length-1)
                // selectSongs(music[TrackTracker]?.song[TrackTrackerin]?.track.id, music[TrackTracker]?.song[TrackTrackerin], covers[TrackTracker]?.cover.id);
                // console.log(music[TrackTracker].song.length)
            }
            selectSongs(music[TrackTracker]?.song[TrackTrackerin]?.track.id, music[TrackTracker]?.song[TrackTrackerin], covers[TrackTracker]?.cover.id);
        }
        if (music[TrackTracker]?.song[TrackTrackerin]?.track.id === activeSong) {
            setisPlaying(true);
            // console.log("fourth")
            console.log("isplaying", TrackTrackerin, TrackTracker)
        }

    }

    const previous = () => {
        // console.log(Tap)
        if (Tap === 1 && audio.current.currentTime > 5) {
            audio.current.currentTime = 0;
        }
        else {
            if (TrackTrackerin >= music[TrackTracker]?.song.length - 1 && TrackTracker !== 0) {
                setTrackTrackerin(music[TrackTracker - 1]?.song.length - 1)
                console.log(music[TrackTracker]?.song.length, TrackTracker)
            }
            console.log(music[TrackTracker].song)
            if (TrackTracker === 0) {
                audio.current.currentTime = 0;
                setTrackTracker(0);
            }
            else {
                if (TrackTrackerin !== 0 && TrackTracker !== 0) {
                    setTrackTrackerin(--TrackTrackerin);
                }
                else {
                    setTrackTracker(--TrackTracker);
                }
            }
            selectSongs(music[TrackTracker]?.song[TrackTrackerin]?.track.id, music[TrackTracker]?.song[TrackTrackerin], covers[TrackTracker]?.cover.id)

        }
        setTap(0);
    }

    const timer = () => {
        clearInterval(time.current);
        time.current = setInterval(() => {
            if (audio.current.ended) {
                next();
                // console.log("next")
            }
            else {
                let progress = parseInt((audio.current.currentTime / audio.current.duration) * 1000);
                setprogress(progress);
                let C = audio.current.currentTime;
                let D = audio.current.duration;
                let min = Math.floor(C / 60);
                let sec = Math.floor(C % 60);
                let mind = Math.floor(D / 60);
                let secd = Math.floor(D % 60);
                if (sec < 10) {
                    sec = `0${sec}`;
                }
                if (secd < 10) {
                    secd = `0${secd}`;
                }
                setduration(`${min}:${sec}`);
                setTotalDuration(`${mind}:${secd}`);
                const mini = 0;
                setBar(((C - mini) * 100) / (D - mini));
            }
        }, [1000]);
    }

    useEffect(() => {

        if (activeSong) {
            setisPlaying(true);
            setTap(1);
            setClick2(1)
            setTrackTrackerin(TrackTrackerin)
            setTrackTracker(TrackTracker)
        }
    }, [activeSong])

    useEffect(() => {
        if (PlayingFrom === "search") {
            audio.current.currentTime = 0;
            setisPlaying(true)
        }
        if ((isPlaying && music[TrackTracker]?.song[TrackTrackerin]?.track.id === activeSong) && (audio.current.paused || audio.current.currentTime <= 0)) {
            audio.current.play();
            timer();
            // console.log(music[TrackTracker]?.song.length)
            console.log("play")
        }
        else {
            audio.current.pause();
            console.log("pause")
        }
        setPlayingFrom('')
    }, [isPlaying, activeSong])

    // useEffect(() => {
    //     audio.current.currentTime = 0;
    // }, [totaldata])

    useEffect(() => {
        if (Click2 === 1) {
            if (!prev && TrackTracker === songs.length - 1) {
                setTrackTracker(0)
                console.log(prev)
                // console.log(TrackTracker)
            }
            selectSongs(music[TrackTracker]?.song[TrackTrackerin]?.track.id, music[TrackTracker]?.song[TrackTrackerin], covers[TrackTracker]?.cover.id)
        }
    }, [TrackTracker])
    useEffect(() => {
        if (prev === false && TrackTrackerin === music[TrackTracker]?.song.length - 1) {
            setTrackTrackerin(0)
            console.log(prev)
            selectSongs(music[TrackTracker]?.song[TrackTrackerin]?.track.id, music[TrackTracker]?.song[TrackTrackerin], covers[TrackTracker]?.cover.id)
            console.log("if active ->", activeSong)
            console.log("if original ->", music[TrackTracker]?.song[TrackTrackerin]?.track.id)
            console.log("if totaldata ->", totaldata?.name)
            console.log("if SONG is changing", TrackTrackerin, TrackTracker)
        }
        else {
            console.log(prev)
            console.log("active ->", activeSong)
            console.log("original ->", music[TrackTracker]?.song[TrackTrackerin]?.track.id)
            console.log("totaldata ->", totaldata?.name)
        }
    }, [TrackTrackerin])

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

    // useEffect(() => {
    //   setTrackTrackerin(0)
    // }, [TrackTracker])
    
    return (
        <>
            <div className={`bottom ${activeSong ? "" : "notplaying"}`} data-open={open} style={first && open ? ({ background: `linear-gradient(to bottom, ${colours[TrackTracker]?.cover?.id?.colour?.darkVibrant?.background}, #000000 100%)` }) : {}}>
                <div className="topopennav" data-open={open}>
                    <img src="chevron.svg" alt="" className="dropdownbutton" onClick={() => { setopen(false) }} data-open={open} />
                    <div className="detailal"><p>playing from playlist</p><p className='topname'>{totaldata?.album}</p></div>
                </div>
                <audio src={activeSong} ref={audio} />
                <div className={clicked ? `shrinkcoverbox ${opacity}` : `outtercoverbox ${opacity}`} style={first ? { display: "none" } : {}} id={opacity}>
                    <div className="buttons">
                        <div className='arrow' onClick={() => { setclicked(!clicked) }}>
                            <img className='downbtn' src="../image/back.png" alt="" width="35" />
                        </div>
                        <img className={clicked ? `shrinkcover ${opacity}` : `outtercover ${opacity}`} src={totaldata === null ? null : (coverdata)} alt="" />
                    </div>
                </div>

                {open ? (<div className="playing" data-open={open}>
                    {first ? (<img className='coverimage' src={totaldata === null ? "" : (coverdata)} alt="" data-open={open} />) : (<img className={clicked ? `coverimage ${opacity}` : `enlargecoverimage ${opacity}`} src={totaldata === null ? "" : (coverdata)} alt="" onClick={() => { setclicked(!clicked) }} />)}
                    <div className="namedetail" data-open={open}>
                        {first ? (
                            (open ? (
                                <Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                                    <h2 id="cap" className='SongName' data-open={open} onClick={expand}>{totaldata?.name}</h2>
                                </Link>
                            ) : (
                                <h2 id="cap" className='SongName' data-open={open}>{totaldata?.name}</h2>
                            ))

                        ) : (
                            <Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                                <h2 id="cap" className='SongName'>{totaldata?.name}</h2>
                            </Link>
                        )}

                        <p id="tain" data-open={open}>{totaldata?.artists}</p>
                    </div>
                </div>
                ) : (
                    <div className="playing" data-open={open} onClick={expand} >
                        {first ? (<img className='coverimage' src={totaldata === null ? "" : (coverdata)} alt="" data-open={open} />) : (<img className={clicked ? `coverimage ${opacity}` : `enlargecoverimage ${opacity}`} src={totaldata === null ? "" : (coverdata)} alt="" onClick={() => { setclicked(!clicked) }} />)}
                        <div className="namedetail" data-open={open}>
                            {first ? ((open ? (<Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                                <h2 id="cap" className='SongName' data-open={open}>{totaldata?.name}</h2>
                            </Link>) : (<h2 id="cap" className='SongName' data-open={open}>{totaldata?.name}</h2>))

                            ) : (
                                <Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                                    <h2 id="cap" className='SongName'>{totaldata?.name}</h2>
                                </Link>
                            )}

                            <p id="tain" data-open={open} onClick={expand}>{totaldata?.artists}</p>
                        </div>
                    </div>
                )}
                {/* <div className="playing" data-open={open} onClick={expand}>
                    {first ? (<img className='coverimage' src={totaldata === null ? "" : (coverdata)} alt="" data-open={open} />) : (<img className={clicked ? `coverimage ${opacity}` : `enlargecoverimage ${opacity}`} src={totaldata === null ? "" : (coverdata)} alt="" onClick={() => { setclicked(!clicked) }} />)}
                    <div className="namedetail" data-open={open}>
                        {first ? ((open ? (<Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                            <h2 id="cap" className='SongName' data-open={open}>{totaldata?.name}</h2>
                        </Link>) : (<h2 id="cap" className='SongName' data-open={open}>{totaldata?.name}</h2>))

                        ) : (
                            <Link href={"/" + `${TrackTracker}=` + songs[TrackTracker]?.slug?.current} key={songs[TrackTracker]?.slug?.current}>
                                <h2 id="cap" className='SongName'>{totaldata?.name}</h2>
                            </Link>
                        )}

                        <p id="tain" data-open={open}>{totaldata?.artists}</p>
                    </div>
                </div> */}

                <div className="controls" data-open={open}>
                    <img src="../image/shuffle.png" alt="Shuffle" className={`RS ${mix ? "active" : ""}`} data-open={open} onClick={shuffl} />
                    <img src="../image/previous.png" alt="Previous" id="pre" className="PN" data-open={open} onClick={previous} />
                    {isPlaying && totaldata?.name ? (
                        <img className="play" id="bottomplay" src={first ? (open ? "/image/pause.png" : "/image/SmallPause.png") : "/image/pause.png"} alt="play" onClick={() => { setisPlaying(!isPlaying); }} data-open={open} />
                    ) : (
                        <img className="play" id="bottomplay" src={first ? (open ? "/image/play.png" : "/image/SmallPlay.png") : "/image/play.png"} alt="pause" onClick={() => { setisPlaying(!isPlaying); }} data-open={open} />
                    )}
                    <img src="../image/next.png" alt="Next" id="nxt" className="PN" data-open={open} onClick={next} />
                    <img src="../image/repeat.png" alt="Repeat" className={`RS ${Repeat ? "active" : ""}`} id="RS" data-open={open} onClick={repeat} />
                </div>

                <div className="id" data-open={open}>
                    <p className="time" id="time" data-open={open}>{activeSong ? (duration) : "0:00"}</p>
                    <input type="range" className="seek" data-open={open} id="seeker" style={activeSong ? { backgroundSize: `${Bar}% 100%` } : { backgroundSize: "0% 100%" }} value={activeSong ? (progress) : "0"} min="0" max="1000" onChange={first ? (open ? ((e) => seeking(e.target.value)) : (null)) : ((e) => seeking(e.target.value))} />
                    <p className="time" id="times" data-open={open}>{activeSong ? (totalDuration) : "0:00"}</p>
                </div>
            </div></>
    )
}

export default Controller
