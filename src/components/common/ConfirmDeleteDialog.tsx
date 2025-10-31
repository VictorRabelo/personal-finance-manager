import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface ConfirmDeleteDialogProps {
  titleKey?: string; // ex: "expenses.deleteAll"
  descriptionKey?: string; // ex: "alerts.confirmDeleteAll"
  confirmLabelKey?: string; // ex: "common.confirm"
  cancelLabelKey?: string; // ex: "common.cancel"
  onConfirm: () => void; // callback da ação
  buttonLabelKey?: string; // texto do botão principal
  buttonVariant?: "outline" | "destructive" | "default"; // tipo do botão
  icon?: boolean; // exibir ícone de lixeira
  className?: string; // customização extra
}

/**
 * Reusable confirmation dialog for destructive actions.
 * Supports i18n and any type of action (delete, reset, clear, etc.)
 */
export const ConfirmDeleteDialog = ({
  titleKey = "common.confirmation",
  descriptionKey = "alerts.confirmDeleteAll",
  confirmLabelKey = "common.confirm",
  cancelLabelKey = "common.cancel",
  buttonLabelKey = "common.delete",
  buttonVariant = "outline",
  icon = true,
  className,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  const { t } = useApp();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className={`text-destructive border-destructive hover:bg-destructive/10 transition-all ${className}`}
        >
          {icon && <Trash2 className="h-4 w-4 mr-2" />}
          {t(buttonLabelKey)}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(titleKey)}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(descriptionKey)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t(cancelLabelKey)}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {t(confirmLabelKey)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};