"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../supbaseClient";
import Footer from "../component/footer";

export default function Booking() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState<any>(null);

  const [masters, setMasters] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  // faqat bugungi va undan keyingi kunlar tanlansin
  const todayDate = new Date().toISOString().split("T")[0];

  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setService(JSON.parse(serviceParam));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchMasters();
    fetchTimes();
  }, []);

  const fetchMasters = async () => {
    const { data, error } = await supabase.from("masters").select("name");
    if (data) {
      setMasters(data.map((m: any) => m.name));
    }
  };

  const fetchTimes = async () => {
    const { data, error } = await supabase.from("times").select("time");
    if (data) {
      setTimes(data.map((t: any) => t.time));
    }
  };

  const handleBook = async () => {
    if (!selectedDay || !selectedMaster || !selectedTime) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const { error } = await supabase.from("books").insert([
      {
        service_id: service.id,
        day: selectedDay,
        master: selectedMaster,
        time: selectedTime,
      },
    ]);

    if (error) {
      alert("Xatolik yuz berdi: " + error.message);
    } else {
      alert("Band qilindi!");
      router.push("/");
    }
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Band qilish: {service?.name}</h1>

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
          >
            <option value="">Tanlang</option>
            {times.map((t) => (
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
      </div>
      <Footer />
    </div>
  );
}
