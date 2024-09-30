"use client";

import { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Chart from "@/components/chart/Chart";

interface DataRow {
  id: number;
  indicator: string;
  today: number;
  yesterday: number;
  thisWeekday: number;
}

const data: DataRow[] = [
  {
    id: 1,
    indicator: "Выручка, руб",
    today: 500521,
    yesterday: 480521,
    thisWeekday: 4805121,
  },
  {
    id: 2,
    indicator: "Наличные",
    today: 300000,
    yesterday: 300000,
    thisWeekday: 300000,
  },
  {
    id: 3,
    indicator: "Безналичный расчет",
    today: 100000,
    yesterday: 100000,
    thisWeekday: 100000,
  },
  {
    id: 4,
    indicator: "Кредитные карты",
    today: 100521,
    yesterday: 100521,
    thisWeekday: 100521,
  },
  {
    id: 5,
    indicator: "Средний чек, руб",
    today: 1300,
    yesterday: 900,
    thisWeekday: 900,
  },
  {
    id: 6,
    indicator: "Средний гость, руб",
    today: 1200,
    yesterday: 800,
    thisWeekday: 800,
  },
  {
    id: 7,
    indicator: "Удаление из чека (после оплаты), руб",
    today: 1000,
    yesterday: 1100,
    thisWeekday: 900,
  },
  {
    id: 8,
    indicator: "Удаление из чека (до оплаты), руб",
    today: 1300,
    yesterday: 1300,
    thisWeekday: 900,
  },
  {
    id: 9,
    indicator: "Количество чеков",
    today: 34,
    yesterday: 36,
    thisWeekday: 34,
  },
  {
    id: 10,
    indicator: "Количество гостей",
    today: 34,
    yesterday: 36,
    thisWeekday: 32,
  },
];

export default function Component() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  function getProcentage(today: number, yesterday: number): number {
    const result = Number(((today / yesterday) * 100 - 100).toFixed(0));
    return result;
  }

  function getColorBgYesterday(yesterday: number, today: number) {
    let color;
    if (yesterday < today) {
      color = "bg-green-200";
    } else if (yesterday > today) {
      color = "bg-red-200";
    } else {
      color = "bg-gray-100";
    }
    return color;
  }

  function getColorWeek(week: number, today: number) {
    let color;
    if (week > today) {
      color = "bg-red-200";
    } else if (week == today) {
      color = "bg-gray-100";
    } else {
      color = "bg-green-200";
    }
    return color;
  }

  return (
    <Table className="border-separate border-spacing-2 border border-slate-400">
      <TableHeader>
        <TableRow>
          <TableHead className="bg-gray-100 text-center">Показатель</TableHead>
          <TableHead className="bg-blue-100 text-center">
            Текущий день
          </TableHead>
          <TableHead className="bg-gray-100 text-center">Вчера</TableHead>
          <TableHead className="bg-gray-100 text-center">
            Этот день недели
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              // key={row.id}
              className="cursor-pointer"
              onClick={() => toggleRow(row.id)}
            >
              <TableCell className="bg-gray-100">{row.indicator}</TableCell>
              <TableCell className="bg-blue-100 text-end">
                {row.today}
              </TableCell>
              <TableCell
                className={
                  getColorBgYesterday(row.yesterday, row.today) +
                  " text-end flex justify-between"
                }
              >
                <div className="">{row.yesterday}</div>
                <div
                  className={
                    (getProcentage(row.today, row.yesterday) < 0
                      ? "text-red-600"
                      : "text-green-600") + " font-bold"
                  }
                >
                  {getProcentage(row.today, row.yesterday)}%
                </div>
              </TableCell>
              <TableCell
                className={
                  getColorWeek(row.thisWeekday, row.today) + "  text-end"
                }
              >
                {row.thisWeekday}
              </TableCell>
            </TableRow>
            {expandedRow === row.id && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="p-4 bg-white">
                    <div className=" flex items-center justify-center">
                      <Chart />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
