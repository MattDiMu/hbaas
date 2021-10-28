import CONFIG from './configuration'

import express from 'express'

const app = express()

app.get('/example', (_req, resp) => {
  resp.send('hi from example')
})

const server = app.listen(CONFIG.port, () => {
  console.log(`HBaaS started on port '${CONFIG.port}'. `)
})

process.on('SIGTERM', () => {
  console.debug('SIGTERM shutdown requested')
  server.close(() => {
    console.log('server shutdown completed')
  })
})
