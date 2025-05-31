"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../supbaseClient";
import Footer from "../component/footer";

export default function Booking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  1;
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [masters, setMasters] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchServiceId = async () => {
      const serviceParam = searchParams.get("service");

      if (!serviceParam) {
        console.error("Service parametri mavjud emas!");
        router.push("/?error=no_service");
        return;
      }

      try {
        const parsedService = JSON.parse(
          decodeURIComponent(serviceParam as string)
        );

        // Agar `id` maydoni bo'lmasa, uni avtomatik hisoblaymiz
        if (!parsedService.id) {
          const { count } = await supabase
            .from("services")
            .select("*", { count: "exact" });
          parsedService.id = (count || 0) + 1; // Yangi id ketma-ketlikda bo'ladi
        }

        console.log("Service obyekt:", parsedService);
        setService(parsedService);
      } catch (error) {
        console.error("Service parametri noto'g'ri formatda:", error);
        router.push("/?error=invalid_service");
      }
    };

    fetchServiceId();
  }, [searchParams, router]);
  useEffect(() => {
    fetchMasters();
    fetchTimes();
  }, []);
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!selectedDay || !selectedMaster) {
        setBookedTimes([]);
        return;
      }

      const { data } = await supabase
        .from("books")
        .select("time")
        .eq("day", selectedDay)
        .eq("master", selectedMaster);

      if (data) setBookedTimes(data.map((b: any) => b.time));
    };

    fetchBookedTimes();
  }, [selectedDay, selectedMaster]);

  const fetchMasters = async () => {
    const { data } = await supabase.from("masters").select("name");
    if (data) setMasters(data.map((m: any) => m.name));
  };

  const fetchTimes = async () => {
    const { data } = await supabase.from("times").select("*");
    if (data) setTimes(data.map((t: any) => t.time));
  };

  const handleBook = async () => {
    if (!service?.id) {
      alert("Xizmat tanlanmagan!");
      return;
    }

    if (!selectedDay || !selectedMaster || !selectedTime) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      const { error } = await supabase.from("books").insert([
        {
          service_id: service.id,
          day: selectedDay,
          master: selectedMaster,
          time: selectedTime,
        },
      ]);

      if (error) throw error;

      alert("Band qilindi!");
      router.push("/");
    } catch (error) {
      alert(`Xatolik yuz berdi: ${(error as Error).message}`);
    }
  };

  const availableTimes = times.filter((t) => {
    // Agar allaqachon band qilingan bo‘lsa – chiqarilmasin
    if (bookedTimes.includes(t)) return false;

    // Agar bugungi kun tanlangan bo‘lsa – o'tgan vaqtlar chiqarilmasin
    if (selectedDay === todayDate) {
      const [hour, minute] = t.split(":").map(Number);
      const now = new Date();
      const selectedTime = new Date();
      selectedTime.setHours(hour, minute, 0, 0);

      if (selectedTime <= now) {
        return false; // bu vaqt o‘tib ketgan
      }
    }

    return true;
  });

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          Band qilish: {service ? service.title : "Xizmat tanlanmagan"}
        </h1>
        <div className="mb-4">
          <label>Kunni tanlang: </label>
          <input
            type="date"
            min={todayDate}
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Master: </label>
          <select
            onChange={(e) => setSelectedMaster(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Tanlang</option>
            {masters.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Vaqt: </label>
          <select
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border p-2 rounded w-full"
            value={selectedTime}
          >
            <option value="">Tanlang</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleBook}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Book
        </button>
      </div>{" "}
      <Footer />
    </div>
  );
}
