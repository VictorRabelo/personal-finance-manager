import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";

interface CurrencyInputProps {
  id?: string;
  value: number;
  className?: string;
  showSymbol?: boolean;
  onChange: (val: number) => void;
}

export const CurrencyInput = ({
  id,
  value,
  className,
  showSymbol = true,
  onChange,
}: CurrencyInputProps) => {
  const { language } = useApp();
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    const formatter = new Intl.NumberFormat(language === "pt-BR" ? "pt-BR" : "en-US", {
      style: showSymbol ? "currency" : "decimal",
      currency: language === "pt-BR" ? "BRL" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setDisplayValue(formatter.format(value || 0));
  }, [value, language, showSymbol]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue) / 100;

    const formatter = new Intl.NumberFormat(language === "pt-BR" ? "pt-BR" : "en-US", {
      style: showSymbol ? "currency" : "decimal",
      currency: language === "pt-BR" ? "BRL" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setDisplayValue(formatter.format(numericValue));
    onChange(numericValue);
  };

  return (
    <Input
      id={id}
      type="text"
      value={displayValue}
      onChange={handleChange}
      className={className}
      placeholder={language === "pt-BR" ? (showSymbol ? "R$ 0,00" : "0,00") : (showSymbol ? "$0.00" : "0.00")}
    />
  );
};
