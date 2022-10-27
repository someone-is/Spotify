export const fetchSongs = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSongs`)

    const data =await res.json();
    const songs=data.songs;
    return songs
}