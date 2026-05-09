"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/auth";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    sync();

    window.addEventListener("user-changed", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("user-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return user;
}