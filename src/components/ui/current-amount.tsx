import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";

export const CurrencyInput = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => {
  const { language } = useApp(); // pega idioma atual do contexto
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(
      new Intl.NumberFormat(language === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: language === "pt-BR" ? "BRL" : "USD",
      }).format(value || 0)
    );
  }, [value, language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue) / 100;
    setDisplayValue(
      new Intl.NumberFormat(language === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: language === "pt-BR" ? "BRL" : "USD",
      }).format(numericValue)
    );
    onChange(numericValue);
  };

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={language === "pt-BR" ? "R$ 0,00" : "$0.00"}
    />
  );
};
