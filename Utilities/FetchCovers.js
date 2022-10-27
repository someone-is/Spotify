export const fetchCovers = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCovers`)

    const data =await res.json();
    const covers=data.covers;
    return covers
}