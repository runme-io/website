import { isDevelopment } from '../Consts'

const robots = {
  UserAgent: '*',
  Disallow: isDevelopment ? '/' : '',
}

export function get (req, res) {
  res.setHeader('Content-Type', 'text/plain')

  const content = Object.keys(robots).reduce((acc, next) => (acc += `${next}: ${robots[next]}\n`), '')

  res.end(content)
}
