import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Artiststile from './Artiststile'
import Tile from './Tile'

function MainComponent({ songs, covers, music, colours, artists }) {
  const [less, setless] = useState("More")
  
  const [first, setfirst] = useState(false)
  const [width, setwidth] = useState()
  const [slice, setslice] = useState(first? artists.slice(0, 3):artists.slice(0, 5))
  const detectSize = () => {
    setwidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize)
    if (window.innerWidth <= 600) {
      setfirst(true)
      setslice(artists.slice(0, 3))
    }
    else {
      setfirst(false)
      setslice(artists.slice(0, 5))
    }
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [width])
  // const More = () =>{
  //   if (less === "More") {
  //     setslice(artists)
  //     setless("Less")
  //   }
  //   else{
      // setslice(artists.slice(0, 5))
  //     setless("More")
  //   }
  // }
  // console.log(artists)
  return (
    <>
      <div className="gaane">
        {songs?.map((songs, tracker) => <Tile key={songs._id} songs={songs} music={music} tracker={tracker} covers={covers} colours={colours} />)}
      </div>
      <div className="artistssection">
        <h1 className='artisth1'>Artists</h1>
        <div className='listofartist'>
        {slice?.map((artists, tracker) => <Artiststile key={artists._id} artists={artists} />)}
        <div className="artisttile">
        <Link href="/Artists">
        <div className="moreartist">
          <img className='microphone' src="../image/icons8-micro-24.png" alt="" />
          {less}
          </div>
        </Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default MainComponent