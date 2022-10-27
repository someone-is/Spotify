export const fetchMusics = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMusics`)

    const data =await res.json();
    const musics=data.musics;
    return musics
}