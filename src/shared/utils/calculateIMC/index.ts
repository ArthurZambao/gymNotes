export function calculateIMC(weight: number, height: number) {
  const imc = (weight * 10000) / (height * height);

  if (imc < 18.5) return { value: imc, status: "Abaixo do peso", color: "text-blue-500" };
  if (imc < 24.9) return { value: imc, status: "Normal", color: "text-green-500" };
  if (imc < 29.9) return { value: imc, status: "Sobrepeso", color: "text-orange-500" };
  if (imc < 34.9) return { value: imc, status: "Obesidade grau 1", color: "text-red-500" };
  if (imc < 39.9) return { value: imc, status: "Obesidade grau 2", color: "text-red-500" };
  if (imc >= 40) return { value: imc, status: "Obesidade grau 3", color: "text-red-500" };
  return { value: imc, status: " ", color: " " };
}