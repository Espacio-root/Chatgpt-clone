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
    const chatId = req.url.split('=')[1]
    const res = await prisma.message.findMany({
        where: {
            chatId: chatId
        }
    })
    if (res) {
        return new Response(JSON.stringify(res), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}