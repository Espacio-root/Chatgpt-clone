import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { message } = await req.json();
    const res = await prisma.message.create({
        data: JSON.parse(message)
    })
    if (res) {
        return new Response(JSON.stringify(res), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function GET(req: Request) {
    const params = Object.values(Object.fromEntries(new URLSearchParams(req.url).entries()))
    const res = await prisma.message.findMany({
        where: {
            chatId: params[0]
        },
        // skip: parseInt(params[1]),
        // take: 5
    })
    if (res) {
        return new Response(JSON.stringify(res), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}