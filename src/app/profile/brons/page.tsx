"use client";
import Footer from "@/app/component/footer";
import { supabase } from "@/app/supbaseClient";
import React, { use, useEffect, useState } from "react";

interface Book {
  service_id: number;
  day: string;
  master: string;
  time: string;
}

const Brons = () => {
  useEffect(() => {
    fetchBooks();
  }, []);

  const [brons, setBrons] = useState<Book[]>([]);
  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("*");
    setBrons(data || []);
  };
  return (
    <div>
      <div>
        <h2>My Brons</h2>
        <div>
          {brons.map((item, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-md bg-white shadow mb-4"
            >
              <h3 className="text-lg font-semibold">{item.service_id}</h3>
              <p className="text-sm text-gray-600">Usta: {item.master}</p>
              <p className="text-sm text-gray-600">Vaqti: {item.time}</p>
              <p className="text-sm text-gray-600">Kun: {item.day}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Brons;
