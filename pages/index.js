import React from 'react'
import { useRecoilState } from 'recoil';
import { fetchSongs } from '../Utilities/FetchSongs';
import Tile from '../components/Tile'
import { bottom, coverurl, playingTrackState} from '../feature/PlayerAtom';
import { client } from '../library/client'

function index({ songs, covers, music }) {
  const [activeSong, setactiveSong] = useRecoilState(playingTrackState);
  const [totaldata, settotaldata] = useRecoilState(bottom);
  const [coverdata, setcoverdata] = useRecoilState(coverurl);

  const selectSongs = (tracks, songs, covers) => {
    setactiveSong(tracks);
    settotaldata(songs);
    setcoverdata(covers);
  }

  return (
    <>
      <div className="gaane">
        {songs?.map((songs, tracker) => <Tile key={songs._id} songs={songs} music={music} tracker={tracker} selectSongs={selectSongs} covers={covers} />)}
      </div>
      <div>index</div>
    </>
  )
}
export const getServerSideProps = async () => {
  // const query = '*[_type == "songs"]';
  // const songs = await client.fetch(query);
  const songs = await fetchSongs();
  // const track = '*[_type == "songs"]{track[0] {"id":asset->.url}}';
  // const tracks = await client.fetch(track);
  const cover = '*[_type == "songs"]{cover {"id":asset->.url}}';
  const covers = await client.fetch(cover);
  const pagesongs = `*[_type == "songs"]{_id,artists,album,cover{ "id":asset->.url},song[]->{_id,name,artists,album,slug{current},track{"id":asset->.url}}}`;
  const music = await client.fetch(pagesongs);
  return {
    props: { songs, covers, music }
  }
}
export default index
