import prisma from "@/static-data/prisma";
import { NextRequest, NextResponse } from "next/server";
import { subDays, format, isAfter } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = new Date(searchParams.get("startDate")!);
    const endDate = new Date(searchParams.get("endDate")!);

    const salesByDay: Record<string, number> = {};
    const days = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= days; i++) {
      const date = format(subDays(endDate, i), "yyyy-MM-dd");
      salesByDay[date] = 0;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    orders.forEach((order) => {
      const dateKey = format(new Date(order.createdAt), "yyyy-MM-dd");
      if (salesByDay[dateKey] !== undefined) {
        salesByDay[dateKey] += order.amount;
      }
    });

    const dailySales = Object.entries(salesByDay)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ dailySales, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error fetching analytics",
      status: 500,
    });
  }
};
