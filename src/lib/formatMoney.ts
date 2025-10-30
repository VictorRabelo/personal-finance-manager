import { useApp } from "@/contexts/AppContext";

export const useCurrencyFormatter = () => {
  const { language } = useApp();

  const format = (value: number, showSymbol: boolean = true) => {
    return new Intl.NumberFormat(language === "pt-BR" ? "pt-BR" : "en-US", {
      style: showSymbol ? "currency" : "decimal",
      currency: language === "pt-BR" ? "BRL" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  return { format };
};