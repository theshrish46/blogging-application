import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(request) {
    const categories = await prisma.category.findMany()

    return NextResponse.json(categories)
}