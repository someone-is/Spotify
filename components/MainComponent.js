import React from 'react'
import Tile from './Tile'

function MainComponent({ songs, covers, music, colours }) {
  return (
    <div className="gaane">
    {songs?.map((songs, tracker) => <Tile key={songs._id} songs={songs} music={music} tracker={tracker} covers={covers} colours={colours} />)}
  </div>
  )
}

export default MainComponent