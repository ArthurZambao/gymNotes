import { LoginPage } from "@/src/modules/login/components/content";
import { Suspense } from "react";

export const metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  )
}