import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
    const { content } = await req.json();
    const task = await prisma.task.create({
        data: { content },
    });
    return NextResponse.json({ task });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
}