import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import { client } from '../library/client';
import { fetchSongs } from '../Utilities/FetchSongs';
function Spotify() {
  const [same, setSame] = useState([]);

  const fetchdata = async () =>{
    const gaana = await fetchSongs(); 
    setSame(gaana);
  }

  useEffect(() => {
    fetchdata();
  }, [])
  console.log(same);
  return (
    <>
      <Link href="/" >
        <div>Home is peoples</div>
      </Link>
        {same.map((item)=><h1 key={item._id}>{item.name}</h1>)}
    </>
  )
}
// export async function getServerSideProps(){
//   const query = `*[_type == "songs"]`;
//   const songs = await client.fetch(query);
//   console.log(songs.length)
//   return {
//     props: { songs }
//   }
// }
export default Spotify