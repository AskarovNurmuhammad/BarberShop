"use client";
// pages/profile.tsx
import React from "react";
import Link from "next/link";
import Footer from "../component/footer";
import { useClerk } from "@clerk/nextjs";
import LogoutButton from "../component/LogoutButton/page";

export default function ProfilePage() {
  const { signOut } = useClerk();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  ">
      <div className="p-4 space-y-4 ">
        <h1 className="text-2xl font-bold">Profil</h1>
        <div className=" d-flex flex-col gap-4">
          <Link
            href="/profile/brons"
            className="text-decoration-none text-black"
          >
            <div className="bg-white p-4 rounded-md shadow hover:bg-gray-50 cursor-pointer ">
              mening bronlarim
            </div>
          </Link>

          <Link
            href="/profile/account"
            className="text-decoration-none text-black"
          >
            <div className="bg-white p-4 rounded-md shadow hover:bg-gray-50 cursor-pointer">
              mening akk
            </div>
          </Link>

          <LogoutButton />
        </div>
      </div>

      <Footer />
    </div>
  );
}
