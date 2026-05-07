export function calculateIMC(weight: number, height: number) {
  const imc = (weight * 10000) / (height * height);

  if (imc < 18.5) return { value: imc, status: "Abaixo do peso", color: "text-blue-500" };
  if (imc < 24.9) return { value: imc, status: "Normal", color: "text-green-500" };
  if (imc < 29.9) return { value: imc, status: "Sobrepeso", color: "text-orange-500" };
  return { value: imc, status: "Obesidade", color: "text-red-500" };
}