import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { chatId, newName } = await req.json();
    let updatedChat
    try {
        updatedChat = await prisma.chat.update({
        where: {
            id: chatId,
        },
        data: {
            name: newName,
        },
        });
    } catch (error) {
        console.error('Error updating chat name:', error);
    }
    if (updatedChat) {
        return new Response(JSON.stringify(updatedChat), {
            headers: {
                'content-type': 'application/json'
            },
            status: 200
        })
    } else {
        return new Response(JSON.stringify({}), {
            headers: {
                'content-type': 'application/json'
            },
            status: 500
        })
    }
}