import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { chatId } = await req.json();
    let post
  try {
    // Find the post by its ID
    post = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!post) {
      console.error('Post not found');
      return;
    }

    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post', error);
  } finally {
    await prisma.$disconnect();
  }
    if (post) {
        return new Response(JSON.stringify(post), {
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