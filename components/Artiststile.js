// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../library/client'

function Artiststile({ artists }) {
    // console.log(artists)
    return (
        <>
        <Link href={"/Artist/" + artists.slug.current} key={artists.slug.current}>
            <div className="artisttile">
                <div className="artistprofile">
                    <img className='profile' src={urlFor(artists.profile)} alt="" height={100} width={100} />
                    {/* <Image src={artists.profile.id} alt="" height={100} width={100} /> */}
                </div>
                <div className="artistname">
                    <p>{artists.name}</p>
                    <span>{artists?.songs?.length} songs</span>
                </div>
            </div>
            </Link>
        </>
    )
}

export default Artiststile