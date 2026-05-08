import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "@/src/lib/api/auth";
import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

type FormErrors = Partial<Record<keyof RegisterData, string>>;

export function useRegisterForm(registerSchema: z.ZodSchema<RegisterData>) {
  const router = useRouter();
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof RegisterData, value: string): void => {
    setForm((prev: RegisterData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clear = () => {
    setForm({ name: "", email: "", password: "" });
    setErrors({});
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        const field = issue.path[0] as keyof RegisterData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await registerUser(result.data);
      toast.success("Conta criada com sucesso!");
      clear();
      router.push("/login");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "Erro ao criar conta."
        : "Erro ao criar conta.";
      toast.error(errorMessage);
    }
  };

  return { form, errors, handleChange, handleSubmit };
}
