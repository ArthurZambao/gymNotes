import { logoutRequest } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return async () => {
    await logoutRequest();
    router.push("/login");
  };
}