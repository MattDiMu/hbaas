import CONFIG from './configuration'

import express from 'express'

const server = express()

server.get('/example', (_req, resp) => {
  resp.send('hi from example')
})

server.listen(CONFIG.port, () => {
  console.log(`HBaaS started on port '${CONFIG.port}'. `)
})

