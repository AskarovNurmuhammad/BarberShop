"use client";
import { useEffect } from "react";
import { useUser, UserResource } from "@clerk/nextjs";
import { supabase } from "../supbaseClient";

interface SupabaseUser {
  clerk_id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

const insertUserToSupabase = async (user: UserResource) => {
  // Avval user bazada mavjudmi, tekshiramiz
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", user.id)
    .single();

  if (existingUser) {
    console.log("User already exists in Supabase, skipping insert.");
    return;
  }

  // Agar mavjud bo'lmasa, yangi userni yozamiz
  const userData: SupabaseUser = {
    clerk_id: user.id,
    name: user.username || "",
    email: user.emailAddresses[0]?.emailAddress || "",
    password: "", // Parolni Clerk bilan boshqarish kerak
    role: "user",
  };

  const { error: insertError } = await supabase
    .from("users")
    .insert([userData]);

  if (insertError) {
    console.error("Supabase insert error:", insertError.message);
  } else {
    console.log("User inserted into Supabase");
  }
};

export const UserSync = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      insertUserToSupabase(user);
    }
  }, [user]);

  return null;
};
