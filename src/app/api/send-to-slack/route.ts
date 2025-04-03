export async function POST(request: Request) {
  const body = await request.json()

  const { message, ticketId } = body
  const fields = [
    {
      type: 'plain_text',
      text: message,
    },
  ]

  if (body?.quote) {
    fields.push({
      type: 'mrkdwn',
      text: `*Reply to:*\n> ${body?.quote}`,
    })
  }

  const res = await fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `${ticketId}: ${message}`,
        blocks: [
          {
            type: 'section',
            fields,
          },
        ],
      }),
    }
  )
  console.log({ res: res.status, ticketId, message, quote: body?.quote })
  return Response.json({ res })
}
