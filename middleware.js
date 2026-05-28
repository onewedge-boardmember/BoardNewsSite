export const config = { matcher: '/(.*)', }

export default function middleware(request) {
  const auth = request.headers.get('Authorization')

  if (auth?.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6))
    const colon = decoded.indexOf(':')
    const user = decoded.slice(0, colon)
    const pass = decoded.slice(colon + 1)

    const validUser = process.env.BASIC_AUTH_USER ?? 'admin'
    const validPass = process.env.BASIC_AUTH_PASSWORD ?? 'changeme'

    if (user === validUser && pass === validPass) return
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Board Member Site"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
