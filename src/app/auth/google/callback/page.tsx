"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token && refreshToken) {
      // Set cookies on the frontend domain (same-site)
      const isProduction = window.location.protocol === "https:";
      const cookieOptions = `path=/; ${isProduction ? "secure;" : ""} samesite=lax; max-age=${60 * 60 * 24 * 7}`;

      document.cookie = `token=${token}; ${cookieOptions}`;
      document.cookie = `refreshToken=${refreshToken}; ${cookieOptions}`;

      router.replace("/home");
    } else {
      router.replace("/login?error=google");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-400">Autenticando...</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400">Carregando...</p>
          </div>
        }
      >
        <GoogleCallbackContent />
      </Suspense>
    </div>
  );
}
