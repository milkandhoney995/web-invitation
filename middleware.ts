import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const maintenanceMode = false
  const pathname = request.nextUrl.pathname

  // メンテナンスページと_next配下（静的ファイル）へのアクセスはスキップ
  const isMaintenancePath = pathname.startsWith('/maintenance')
  const isStaticFile = pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/images')

  if (maintenanceMode && !isMaintenancePath && !isStaticFile) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}