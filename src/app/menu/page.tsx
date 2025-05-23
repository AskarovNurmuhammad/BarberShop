"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "../component/ServiceCard";
import Footer from "../component/footer";
import { supabase } from "../supbaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (service: any) => {
    const queryString = `/booking?service=${encodeURIComponent(
      JSON.stringify(service)
    )}`;
    router.push(queryString);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*");
    setServices(data || []);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Xizmatlar</h1>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            {...service}
            onClick={() => handleServiceClick(service)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
