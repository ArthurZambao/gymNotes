import { logoutRequest } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return async () => {
    await logoutRequest();
    window.dispatchEvent(new Event("user-changed"));
    router.push("/login");
  };
}