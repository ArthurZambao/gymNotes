import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors extends Partial<Record<keyof RegisterData, string>> { }

export function useRegisterForm(registerSchema: z.ZodSchema) {
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
    setForm({
      name: "",
      email: "",
      password: "",
    });
    setErrors({});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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

    console.log("Dados válidos:", result.data);
    toast.success("Conta criada com sucesso!");
    clear();
    setErrors({});
    redirect("/login");
  };

  return { form, errors, handleChange, handleSubmit };
}