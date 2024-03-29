import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { opening } from '../feature/PlayerAtom';
import Spotifylogo from './Spotifylogo';
function Left() {
    const [open] = useRecoilState(opening)
    const router = useRouter();
    const [button, setButton] = useState("icon2");
    const [button2, setButton2] = useState("icon1");
    const [buttonsearch, setButtonsearch] = useState("icon1");
    const [buttonsearch2, setButtonsearch2] = useState("icon2");
    const [buttonlib, setButtonlib] = useState("icon1");
    const [buttonlib2, setButtonlib2] = useState("icon2");

    // const [active, setactive] = useState(false);
    // const [activesearch, setactivesearch] = useState(false);
    // const [activelib, setactivelib] = useState(false);

    const Home = () => {
        setButton("icon2")
        setButton2("icon1")
        setButtonlib("icon1")
        setButtonlib2("icon2")
        setButtonsearch("icon1")
        setButtonsearch2("icon2")
        // setactive(true)
        // setactivesearch(false)
        // setactivelib(false)
    }
    const Search = () => {
        setButtonsearch("icon2")
        setButtonsearch2("icon1")
        setButtonlib("icon1")
        setButtonlib2("icon2")
        setButton("icon1")
        setButton2("icon2")
        // setactivesearch(true)
        // setactive(false)
        // setactivelib(false)
    }
    const lib = () => {
        setButtonlib("icon2")
        setButtonlib2("icon1")
        setButtonsearch("icon1")
        setButtonsearch2("icon2")
        setButton("icon1")
        setButton2("icon2")
        // setactivelib(true)
        // setactive(false)
        // setactivesearch(false)
    }

    useEffect(() => {
        if (router.pathname === "/") {
            Home();
        }
        if (router.pathname === "/Search") {
            Search();
        }
        if (router.pathname === "/Library") {
            lib();
        }
        if (router.pathname !== "/Library" && router.pathname !== "/Search" && router.pathname !== "/") {
            setButtonsearch("icon1")
            setButtonsearch2("icon2")
            setButton("icon1")
            setButton2("icon2")
            setButtonlib("icon1")
            setButtonlib2("icon2")
        }
    }, [router.pathname])

    return (
        <div className="left" data-open={open}>
            {/* <img src="../image/Screenshot 2022-07-27 164410.jpg" alt="" className="logo" /> */}
            {/* <img src="https://betterstudio.com/wp-content/uploads/2022/09/4-Spotify-logo-SVG-betterstudio.com_.svg" alt="" className="logo" /> */}
            <Spotifylogo width={230} height={100} className='logo' />
            <ul className="spotify">
                <Link href="/">
                    <li className={`yours ${router.pathname === '/' ? 'activebtn' : ""}`} onClick={Home}>
                        <div className="img">
                            <img src="../image/home.png" alt="" className={button} />
                            <img src="../image/homes.png" alt="" className={button2} />
                        </div>
                        <span>home</span>
                    </li>
                </Link>
                <Link href="/Search">
                    <li className={`yours ${router.pathname === '/Search' ? 'activebtn' : ""}`} onClick={Search}>
                        <div className="img">
                            <img src="../image/search.png" alt="" className={buttonsearch} />
                            <img src="../image/searchs.png" alt="" className={buttonsearch2} />
                        </div>
                        <span>search</span>
                    </li>
                </Link>
                <Link href="/Library">
                    <li className={`yours ${router.pathname === '/Library' ? 'activebtn' : ""}`} onClick={lib}>
                        <div className="img">
                            <img src="../image/library.png" alt="" className={buttonlib} />
                            <img src="../image/librarys.png" alt="" className={buttonlib2} />
                        </div>
                        <span> your library </span>
                    </li>
                </Link>
                <div className="cp">
                    <li className={`yours `}>
                        <div className="img">
                            <img src="../image/Screenshot 2022-07-27 114141.jpg" alt="" className="bri" />
                        </div>
                        <span>create playlists</span>
                    </li>
                    <li className={`yours `}>
                        <div className="img">
                            <img src="../image/Screenshot 2022-07-27 114241.jpg" alt="" className="bri" />
                        </div>
                        <span>liked songs</span>
                    </li>
                </div>
            </ul>
            <hr style={
                {
                    height: "1px",
                    borderWidth: "0",
                    marginLeft: "7%",
                    width: "83%",
                    color: "rgba(255, 255, 255, 0.5)",
                    backgroundColor: " rgba(255, 255, 255, 0.5)"
                }}
            />
        </div>
    )
}

export default Left