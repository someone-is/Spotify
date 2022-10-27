export const fetchColours= async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getColours`)

    const data =await res.json();
    const colours=data.colours;
    return colours
}