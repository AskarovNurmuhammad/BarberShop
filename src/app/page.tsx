"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import boyaImage from "./images/socholish.avif";
import soqolImage from "./images/soqol.webp";
import sochImage from "./images/erkaklar-soch-turmagi3.jpg";
import Footer from "./component/footer";

export default function Home() {
  const router = useRouter();

  const services = [
    {
      title: "Soch olish",
      price: "5000 so'm",
      duration: "30 daqiqa",
      image: sochImage,
    },
    {
      title: "Soch buyash",
      price: "7000 so'm",
      duration: "40 daqiqa",
      image: boyaImage,
    },
    {
      title: "Soqol olish",
      price: "4000 so'm",
      duration: "20 daqiqa",
      image: soqolImage,
    },
  ];

  const handleServiceClick = (service: any) => {
    const query = `/booking?service=${encodeURIComponent(
      JSON.stringify(service)
    )}`;
    router.push(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700">Barber Shop</h1>
        <p className="text-gray-600 mt-2">Eng yaxshi xizmatlar bizda!</p>
      </header>

      {/* Xizmatlar */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Bizning Xizmatlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => handleServiceClick(service)}
              className="cursor-pointer border p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={service.image}
                alt={service.title}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Narxi:</span> {service.price}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Davomiyligi:</span>{" "}
                {service.duration}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-700 text-white text-center py-4 rounded-lg shadow-lg">
        <p className="text-sm">
          © 2025 Barber Shop. Barcha huquqlar himoyalangan.
        </p>
        <p className="text-sm">Biz bilan bog'laning: +998 90 123 45 67</p>
      </footer>
      <Footer />
    </div>
  );
}
