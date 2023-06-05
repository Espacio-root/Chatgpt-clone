import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { userId, name } = await req.json();
    const chat = await prisma.chat.create({
        data: {
            name: name,
            userId: userId,
        },
        // select: {
        //     id: true,
        // }
        include: {
            user: true
        }
    })
    if (chat) {
        return new Response(JSON.stringify(chat), {
            headers: {
                'content-type': 'application/json'
            },
            status: 200
        })
    }
}

export async function GET(req: Request) {
    const userId = req.url.split('=')[1]
    const res = await prisma.chat.findMany({
        where: {
            userId: userId
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