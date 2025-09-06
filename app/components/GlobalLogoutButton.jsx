"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function GlobalLogoutButton() {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut()}
      className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:scale-105 hover:opacity-90 transition-all z-50"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
