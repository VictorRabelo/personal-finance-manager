import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemo } from 'react';

type HistoryTableEntry = {
  month: string;
  total: number;
  transactions: number;
};

type HistoryTableProps = {
  data: HistoryTableEntry[];
  monthLabels: Record<string, string>;
  selectedMonth: string;
  onMonthSelect?: (month: string) => void;
  currencyFormatter?: (value: number) => string;
  noDataLabel: string;
  monthHeader: string;
  totalHeader: string;
  transactionsHeader: string;
};

export const HistoryTable = ({
  data,
  monthLabels,
  selectedMonth,
  onMonthSelect,
  currencyFormatter = value => `$${value.toFixed(2)}`,
  noDataLabel,
  monthHeader,
  totalHeader,
  transactionsHeader,
}: HistoryTableProps) => {
  const rows = useMemo(() => {
    const withTotals = data.filter(item => item.total > 0);
    return withTotals.length ? withTotals : data;
  }, [data]);

  if (!rows.length || rows.every(row => row.total === 0)) {
    return <p className="text-sm text-muted-foreground">{noDataLabel}</p>;
  }

  const handleRowClick = (month: string) => {
    if (!onMonthSelect) return;
    onMonthSelect(month);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead>{monthHeader}</TableHead>
            <TableHead>{totalHeader}</TableHead>
            <TableHead>{transactionsHeader}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.month}
              data-state={selectedMonth === row.month ? 'selected' : undefined}
              className={onMonthSelect ? 'cursor-pointer' : undefined}
              onClick={() => handleRowClick(row.month)}
            >
              <TableCell className="font-medium text-foreground">
                {monthLabels[row.month] || row.month}
              </TableCell>
              <TableCell>{currencyFormatter(row.total)}</TableCell>
              <TableCell className="text-muted-foreground">{row.transactions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
