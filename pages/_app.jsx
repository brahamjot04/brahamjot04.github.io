import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Pre";
import "../styles/App.css";
import "../styles/index.css";
import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }) {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <SpeedInsights />
    </>
  );
}
