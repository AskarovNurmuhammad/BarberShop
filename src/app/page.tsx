import React from "react";
import Footer from "./component/footer";
import ServiceCard from "./component/ServiceCard";
import Image from "next/image";
import soch from "./images/socholish.avif";
import soqol from "./images/soqol.webp";
export default function Home() {
  const services = [
    { title: "Soch olish", price: "5000 so'm", duration: "30 daqiqa" },
    { title: "Soch buyash", price: "7000 so'm", duration: "40 daqiqa" },
    { title: "Soqol olish", price: "4000 so'm", duration: "20 daqiqa" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="space-y-4">
        <Image className="w-full" src={soch} alt="rasm" />
        <Image className="w-full" src={soqol} alt="rasm" />
      </div>
      <Footer />
    </div>
  );
}
