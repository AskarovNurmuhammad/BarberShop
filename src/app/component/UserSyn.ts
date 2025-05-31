"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../supbaseClient";

interface ClerkUser {
  id: string;
  username?: string | null;
  emailAddresses: Array<{
    emailAddress: string;
  }>;
  firstName?: string | null;
  lastName?: string | null;
}

interface SupabaseUser {
  clerk_id: string;
  name: string;
  email: string;
  role: string;
}

const insertUserToSupabase = async (user: ClerkUser) => {
  // Avval tekshiramiz user bazada bor-yo'qligini
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", user.id)
    .single();

  if (existingUser) {
    console.log("User already exists in Supabase");
    return;
  }

  // Yangi user uchun ma'lumot
  const userData: SupabaseUser = {
    clerk_id: user.id,
    name:
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.username ||
      "User",
    email: user.emailAddresses[0]?.emailAddress || "",
    role: "user",
  };

  // Supabasega yozamiz
  const { error } = await supabase.from("users").insert([userData]);

  if (error) {
    console.error("Error inserting user:", error.message);
  } else {
    console.log("User successfully added to Supabase");
  }
};

export const UserSync = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      insertUserToSupabase({
        id: user.id,
        username: user.username,
        emailAddresses: user.emailAddresses,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  return null;
};
