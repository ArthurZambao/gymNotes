"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/auth";
import { getMeRequest } from "@/src/lib/api/auth";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    sync();

    const stored = localStorage.getItem("user");
    if (!stored) {
      getMeRequest()
        .then((userData) => {
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            window.dispatchEvent(new Event("user-changed"));
          }
        })
        .catch(() => {
        });
    }

    window.addEventListener("user-changed", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("user-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return user;
}