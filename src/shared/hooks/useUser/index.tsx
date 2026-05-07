"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/auth";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return user;
}