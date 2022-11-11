import { useRouter } from 'next/router';
import React from 'react'
import Artistspagetile from '../components/Artistspagetile';
import { client } from '../library/client';

function Artists({ artists }) {
    const router = useRouter();
    return (
    <>
      <div className="maincontainer">
        <div className="artistpage">
            <div className="Artistnav">
                {/* <div className="searchbox"> */}
                    <div onClick={() => router.back()} >
                        <img className='navigationbutton' src="../image/back.png" alt="" width="35" />
                    </div>
                    <div className="textandbox">
                        <h1>Artists</h1>
                    </div>
                {/* </div> */}
                </div>
            <div className="artists">
                {artists?.map((artists, tracker) => <Artistspagetile key={artists._id} artists={artists} />)}
            </div>
            </div>
            </div>
        </>
    )
}
export const getServerSideProps = async () => {
    const artist = `*[_type == "artists"]{...,profile{...,"id":asset->.metadata{"colour":palette}},"songs": *[_type == "music" && references(^._id)]{album,name,slug,artist[]->{name},thumbnail{"id":asset->.url},track{"id":asset->.url}}}`;
    const artists = await client.fetch(artist);
    return {
        props: { artists }
    }
}
export default Artists