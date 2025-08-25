import { NextRequest, NextResponse } from 'next/server'

type RouteParams = { params: { path: string[] } }

async function handleProxy(request: NextRequest, params: RouteParams['params']) {
  const baseUrlHeader = request.headers.get('x-n8n-url') || ''
  const apiKeyHeader = request.headers.get('x-n8n-api-key') || request.headers.get('x-n8n-key') || ''

  if (!baseUrlHeader || !apiKeyHeader) {
    return NextResponse.json({ error: 'Missing n8n credentials' }, { status: 400 })
  }

  // Normalize base URL
  let baseUrl = baseUrlHeader
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'https://' + baseUrl
  }
  baseUrl = baseUrl.replace(/\/+$/, '')

  const path = Array.isArray(params?.path) ? params.path.join('/') : ''
  const search = request.nextUrl.search || ''
  const targetUrl = `${baseUrl}/api/v1/${path}${search}`

  const method = request.method

  // Build headers for upstream
  const upstreamHeaders = new Headers()
  upstreamHeaders.set('X-N8N-API-KEY', apiKeyHeader)
  const contentType = request.headers.get('content-type')
  if (contentType) upstreamHeaders.set('content-type', contentType)
  const accept = request.headers.get('accept')
  if (accept) upstreamHeaders.set('accept', accept)

  // Only send a body for methods that support it
  let body: BodyInit | undefined
  if (!['GET', 'HEAD'].includes(method)) {
    const buffer = await request.arrayBuffer()
    body = buffer.byteLength ? buffer : undefined
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers: upstreamHeaders,
      body,
      redirect: 'manual',
    })

    // Prepare response headers
    const responseHeaders = new Headers()
    upstreamResponse.headers.forEach((value, key) => {
      if (['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) return
      responseHeaders.set(key, value)
    })

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Upstream request failed', details: error?.message || 'unknown' }, { status: 502 })
  }
}

export async function GET(request: NextRequest, ctx: RouteParams) {
  return handleProxy(request, ctx.params)
}

export async function POST(request: NextRequest, ctx: RouteParams) {
  return handleProxy(request, ctx.params)
}

export async function PUT(request: NextRequest, ctx: RouteParams) {
  return handleProxy(request, ctx.params)
}

export async function PATCH(request: NextRequest, ctx: RouteParams) {
  return handleProxy(request, ctx.params)
}

export async function DELETE(request: NextRequest, ctx: RouteParams) {
  return handleProxy(request, ctx.params)
}

export const dynamic = 'force-dynamic'


