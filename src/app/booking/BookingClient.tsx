"use client";
// ...va keyin siz yozgan Booking componentini to‘liq shu faylga joylashtiring.
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../supbaseClient";
import Footer from "../component/footer";

interface Service {
  id?: number;
  title?: string;
}

interface Master {
  name: string;
}

interface Time {
  time: string;
}

interface Book {
  time: string;
}

export default function Booking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState<Service | null>(null);

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
        const parsedService: Service = JSON.parse(
          decodeURIComponent(serviceParam)
        );

        if (!parsedService.id) {
          const { count } = await supabase
            .from("services")
            .select("*", { count: "exact" });
          parsedService.id = (count || 0) + 1;
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

      if (data) setBookedTimes(data.map((b: Book) => b.time));
    };

    fetchBookedTimes();
  }, [selectedDay, selectedMaster]);

  const fetchMasters = async () => {
    const { data } = await supabase.from("masters").select("name");
    if (data) setMasters(data.map((m: Master) => m.name));
  };

  const fetchTimes = async () => {
    const { data } = await supabase.from("times").select("*");
    if (data) setTimes(data.map((t: Time) => t.time));
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
    if (bookedTimes.includes(t)) return false;

    if (selectedDay === todayDate) {
      const [hour, minute] = t.split(":").map(Number);
      const now = new Date();
      const selectedTime = new Date();
      selectedTime.setHours(hour, minute, 0, 0);

      if (selectedTime <= now) {
        return false;
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
      </div>
      <Footer />
    </div>
  );
}
