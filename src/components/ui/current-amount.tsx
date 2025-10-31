import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  id?: string;
  value: number;
  className?: string;
  showSymbol?: boolean;
  required?: boolean;
  onChange: (val: number) => void;
  onValidityChange?: (isValid: boolean) => void;
}

export const CurrencyInput = ({
  id,
  value,
  className,
  showSymbol = true,
  required = false,
  onChange,
  onValidityChange,
}: CurrencyInputProps) => {

  const { language } = useApp();
  const [displayValue, setDisplayValue] = useState("");
  const [touched, setTouched] = useState(false);

  const formatter = new Intl.NumberFormat(
    language === "pt-BR" ? "pt-BR" : "en-US",
    {
      style: showSymbol ? "currency" : "decimal",
      currency: language === "pt-BR" ? "BRL" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  useEffect(() => {
    setDisplayValue(formatter.format(value || 0));

    if (onValidityChange) {
      const isValid = !required || !!value;
      onValidityChange(isValid);
    }
  }, [value, language, showSymbol, required]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue) / 100;

    setDisplayValue(formatter.format(numericValue));
    onChange(numericValue);

    if (onValidityChange) onValidityChange(!required || numericValue > 0);
  };

  const handleBlur = () => setTouched(true);

  const isInvalid = required && touched && (!value || value === 0);

  return (
    <div className="flex flex-col space-y-1">
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={cn(
          className,
          isInvalid && "border-destructive focus-visible:ring-destructive"
        )}
        placeholder={language === "pt-BR" ? (showSymbol ? "R$ 0,00" : "0,00") : (showSymbol ? "$0.00" : "0.00")}
      />
      {isInvalid && (
        <span className="text-destructive text-xs font-medium">
          {language === "pt-BR"
            ? "Este campo é obrigatório"
            : "This field is required"}
        </span>
      )}
    </div>
  );
};
