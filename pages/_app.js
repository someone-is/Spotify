import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { Router } from 'next/router';
import { useState } from 'react';
import Loadings from '../components/Loadings';
import Controller from '../components/Controller';
import Left from '../components/Left';

function MyApp({ Component, pageProps }) {
  const [Loading, setLoading] = useState(false)
  Router.events.on("routeChangeStart",(url)=>{
    console.log("changing");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete",(url)=>{
    console.log("complete");
    setLoading(false);
  });
  return (
    <RecoilRoot>
      {Loading && <Loadings/>}
      <Left/>
      <Component {...pageProps} />
      <Controller/>
    </RecoilRoot>
  );
}

export default MyApp
