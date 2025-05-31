"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "../component/ServiceCard";
import Footer from "../component/footer";
import { supabase } from "../supbaseClient";
import { useRouter } from "next/navigation";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
}

export default function Home() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("id", { ascending: true });

        console.log("Supabasedan kelgan ma'lumotlar:", data); // Debug

        if (error) throw error;

        if (data) {
          setServices(data);
          console.log("Statega saqlangan ma'lumotlar:", data);
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service: Service) => {
    router.push(
      `/booking?service=${encodeURIComponent(JSON.stringify(service))}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Xizmatlar</h1>

      {services.length === 0 ? (
        <div className="text-center py-8">Hozircha xizmatlar mavjud emas</div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              price={service.price}
              time={service.duration} // ServiceCard prop nomi bilan mos kelishi kerak
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
