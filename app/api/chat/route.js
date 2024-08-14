import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  
  });

  const {
    model = 'gpt-4o-mini',
    messages,
    temperature = 0.7,
    max_tokens = null,
    frequency_penalty = 0,
    presence_penalty = 0,
    stop = null,
    n = 1,
    stream = false,
    logit_bias = null,
    user = null,
    tools = null,
    top_p = 1
  } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      frequency_penalty,
      presence_penalty,
      stop,
      n,
      stream,
      logit_bias,
      user,
      tools,
      top_p,
    });

    if (stream) {
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                const text = encoder.encode(content);
                controller.enqueue(text);
              }
            }
          } catch (err) {
            controller.error(err);
          } finally {
            controller.close();
          }
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Transfer-Encoding': 'chunked',
        },
      });
    } else {
      const aiMessage = completion.choices[0].message.content;
      return new NextResponse(JSON.stringify({ message: aiMessage }), { status: 200 });
    }
  } catch (error) {
    console.error('Err communicating with OpenAI API:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate response from AI' }), { status: 500 });
  }
}
