import { useState } from "react";
import { LoginData, Errors } from "../schemas/login-schema";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { loginRequest } from "@/src/lib/api/auth";

export function useLoginForm(loginSchema: any) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof LoginData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const clear = () => {
    setForm({
      email: "",
      password: "",
    });
    setErrors({});
  }

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
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("LOGADO:", data);

      toast.success("Login bem-sucedido!");
      clear();
      setErrors({});
      router.push("/home");
    } catch (err: any) {
      console.log("Falha no login (401):", err.response?.data?.message);
      const errorMessage = err.response?.data?.message || "Ocorreu um erro ao fazer login.";
      toast.error(errorMessage);
    }
  };

  return { form, errors, handleChange, handleSubmit };
}