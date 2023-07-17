export interface ChatGPTMessage {
    role: 'user' | 'system';
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    let controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`
            },
            method: 'POST',
            body: JSON.stringify(payload),
        })

        return response.body

    } catch (e) {
        console.error(e);
        controller.abort();
    }
}

export async function StreamReader(stream: any, decoder: TextDecoder, callBackFn: (newText: string) => void) {
    const reader = stream.getReader();

    while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk ?? { done: true, value: undefined };

        if (done) {
            break;
        }

        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split('\n');
        const parsedLines = lines
            .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
            .filter((line) => line !== "") // Remove empty lines and "[DONE]"
            .map((line) => JSON.parse(line)); // Parse JSON
        parsedLines.forEach((line) => {
            if (line?.choices?.[0]?.delta?.content) {
                // callBackFn(id, line.choices[0].delta.content)
                callBackFn(line.choices[0].delta.content)
            }
        })

    }
}