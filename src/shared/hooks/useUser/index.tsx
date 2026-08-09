"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/auth";
import { getMeRequest } from "@/src/lib/api/auth";

function getSafeUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    if (!stored || stored === "undefined" || stored === "null") {
      return null;
    }
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sync = () => {
      setUser(getSafeUserFromStorage());
    };
    sync();

    const storedUser = getSafeUserFromStorage();
    if (!storedUser) {
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