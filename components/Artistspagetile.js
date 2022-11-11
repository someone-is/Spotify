// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../library/client'

function Artistspagetile({ artists }) {
    // console.log("1" ,artists)
    // console.log("2" ,artists.profile.id.colour.lightVibrant.foreground)
    // console.log("3" ,artists.profile.id.colour.darkVibrant.background)
    // console.log("4" ,artists.profile.id.colour.darkVibrant.foreground)

    return (
        <>
        <Link href={"/Artist/" + artists.slug.current} key={artists.slug.current}>
            <div className="artistpagetile">
                <div className="artistpageprofile">
                    <img className='profilepage' src={urlFor(artists.profile)} alt="" height={100} width={100} />
                    {/* <Image src={artists.profile.id} alt="" height={100} width={100} /> */}
                </div>
                <div className="artistpagename">
                    <p>{artists.name}</p>
                    <span>{artists?.songs?.length} {artists.songs.length===1 ? "song":"songs"} </span>
                </div>
            </div>
            </Link>
            <style jsx>{`
            @media (prefers-color-scheme: light) {
                html {
                  color-scheme: light;
                }
            .artistpagename{
                background:${artists.profile.id.colour.lightVibrant.background}80;
            }
            .artistpagename p{
                color:${artists.profile.id.colour.darkVibrant.background};
            }
            .artistpagename span{
                background:${artists.profile.id.colour.darkVibrant.background}99;              
            }
            @media only screen and (max-width: 600px) {
                .artistpagetile{
                    background:${artists.profile.id.colour.darkVibrant.background}52;  
                }
            }
        }
        @media (prefers-color-scheme: dark) {
            html {
              color-scheme: dark;
            }
            .artistpagename{
                background:${artists.profile.id.colour.darkVibrant.background}80;
            }
            @media only screen and (max-width: 600px) {
                .artistpagetile{
                    background:${artists.profile.id.colour.lightVibrant.background}52;  
                }
            }
        }
            `}</style>
        </>
    )
}

export default Artistspagetile