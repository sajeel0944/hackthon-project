"use client";
import Footer from "@/components/MainPage/Footer";
import Hero from "@/components/MainPage/Hero";
import Info from "@/components/MainPage/Info";
import Nav from "@/components/MainPage/Nav";
import Options from "@/components/MainPage/Options";
import Testimonial from "@/components/MainPage/Testimonial";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
config.autoAddCss = false;

export default function Home() {
  useEffect(() => {
    
    const localStorageData = localStorage.getItem("doctorData");

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData); // Now it's an object
      console.log(parsedData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe]">
      <Nav />
      <Hero
        tilte="AI-Powered Healthcare Monitoring"
        subTitle="Your Health, Our Priority"
        discribtion="Experience seamless health management with our AI-powered platform that connects patients and doctors for proactive care."
      />
      <Options />
      <Info />
      <Testimonial />
      <Footer />
    </div>
  );
}


// hjdsayuc ajshdhdyisah asjhxciusauhdihidsusc csajhchuascjbbsauihca scjch ashichsa hasdj9sacskahadnsa ijsaidhiusa ckassdndiusacacdnjnadidjcj
