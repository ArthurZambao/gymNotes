import { useEffect, useState } from "react";
import { LoginData, Errors } from "../schemas/login-schema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginRequest } from "@/src/lib/api/auth";

export function useLoginForm(loginSchema: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("verify") === "true";
  const verified = searchParams.get("verified");
  const emailParam = searchParams.get("email") || "";
  const alreadyExists = searchParams.get("exists") === "true";
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<LoginData>({
    email: emailParam,
    password: "",
  });

  const handleChange = (field: keyof LoginData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  useEffect(() => {
    if (verified === "false") {
      toast.error("Link de verificação inválido ou expirado.");
    } else if (verified === "true") {
      toast.success("Email verificado com sucesso! Agora você pode fazer login.");
    }
    
    if (alreadyExists) {
      toast.info("Este e-mail já está cadastrado. Faça login para continuar.");
    }
  }, [verified, alreadyExists]);

  const clear = () => {
    setForm({ email: "", password: "" });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Errors = {};

      result.error.issues.forEach((issue: { path: (string | number)[]; message: string }) => {
        const field = issue.path[0] as keyof LoginData;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      const data = await loginRequest(result.data);
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      window.dispatchEvent(new Event("user-changed"));

      toast.success("Login bem-sucedido!");
      clear();
      router.push("/home");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Ocorreu um erro ao fazer login.";
      toast.error(errorMessage);
    }
  };

  return { form, errors, handleChange, handleSubmit };
}