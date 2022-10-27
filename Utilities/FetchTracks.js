export const fetchTracks = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTracks`)

    const data =await res.json();
    const tracks=data.tracks;
    return tracks
}