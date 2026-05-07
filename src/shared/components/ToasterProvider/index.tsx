"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'bg-black text-white border-black',
          success: 'bg-green-500 text-white border-green-600',
          error: 'bg-red-500 text-white border-red-600',
          icon: 'text-white',
        },
      }}
    />
  );
}