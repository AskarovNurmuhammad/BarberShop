"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../supbaseClient";

const insertUserToSupabase = async (user: any) => {
  // Avval user bazada mavjudmi, tekshiramiz
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id") // faqat id ni tekshiramiz
    .eq("clerk_id", user.id)
    .single();

  if (existingUser) {
    console.log("User already exists in Supabase, skipping insert.");
    return;
  }

  // Agar mavjud bo'lmasa, yangi userni yozamiz
  const { error: insertError } = await supabase.from("users").insert([
    {
      clerk_id: user.id,
      name: user.username,
      email: user.emailAddresses[0].emailAddress,
      password: user.password,
      role: "user",
    },
  ]);

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
