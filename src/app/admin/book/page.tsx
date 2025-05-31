"use client";
import Footer from "@/app/component/footer";
import { supabase } from "@/app/supbaseClient";
import React, { useEffect, useState } from "react";

interface Book {
  service_id: number;
  day: string;
  master: string;
  time: string;
}

const Brons = () => {
  const [brons, setBrons] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("*");
    setBrons(data || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Bookings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brons.map((item, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Service ID: {item.service_id}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Master:</span> {item.master}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Time:</span> {item.time}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Day:</span> {item.day}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Brons;
