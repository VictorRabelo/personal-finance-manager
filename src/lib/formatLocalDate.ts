import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

/**
* Applies Title Case intelligently (ignores prepositions and short articles).
*/
const toSmartTitleCase = (text: string, language: string): string => {
  const lowerWords =
    language === "pt-BR"
      ? ["de", "do", "da", "dos", "das", "e"]
      : ["of", "in", "on", "at", "to", "for", "and"];

  return text
    .split(" ")
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && lowerWords.includes(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
};

/**
* Formats a date to the user's local standard.
* Corrects the time zone problem (one day earlier)
* and displays a dynamic format (e.g., "Nov 16, 2025" or "November 16, 2025").
*/
export const formatLocalDate = (
  dateString: string,
  language: string = navigator.language || "en-US"
): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);

  const locale = language === "pt-BR" ? ptBR : enUS;
  const formatPattern = language === "pt-BR" ? "d 'de' MMMM 'de' yyyy" : "MMM d, yyyy";

  const formatted = format(localDate, formatPattern, { locale });

  return toSmartTitleCase(formatted, language);
};

/**
* Returns the current reference month and year (e.g., "October 2025" or "October, 2025").
*/
export const getCurrentMonthLabel = (
  language: string = navigator.language || "en-US",
  referenceDate: Date = new Date()
): string => {
  const locale = language === "pt-BR" ? ptBR : enUS;
  const formatPattern = language === "pt-BR" ? "MMMM 'de' yyyy" : "MMMM, yyyy";

  const formatted = format(referenceDate, formatPattern, { locale });

  return toSmartTitleCase(formatted, language);
};