import type { Metadata } from "next";
import "./globals.css";
import { MainHeader } from "../shared/components/MainHeader";
import { MainFooter } from "../shared/components/MainFooter";
import Image from "next/image";
import { MainContent } from "../shared/components/mainContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GymNotes",
  description: "Site para Anotações de Treino",
  icons: {
    icon: "/icons/dumbbell.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="...">
      <body className="min-h-screen relative text-white">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/background-image.png"
            alt="Background"
            fill
            quality={75}
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <MainHeader />
        <MainContent>
          {children}
          <Toaster/>
        </MainContent>
        <MainFooter />
      </body>
    </html>
  );
}
