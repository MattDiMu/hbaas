import CONFIG from './configuration'

import express, { Request, Response } from 'express'
import { convertToPdf } from './middlewares/convertToPdf'
import { convertToImage } from './middlewares/convertToImage'
import { exportDom } from './middlewares/exportDom'

const app = express()

app.use('/', express.static('public'))
app.get('/convert-to-pdf', convertToPdf)
app.get('/convert-to-image', convertToImage)
app.get('/export-dom', exportDom)

app.get('/health-check', (_req, resp) => {
  resp.send('success')
})

const server = app.listen(CONFIG.port, () => {
  console.info(`HBaaS started on port '${CONFIG.port}'. `)
})

process.on('SIGTERM', () => {
  console.debug('SIGTERM shutdown requested')
  server.close(() => {
    console.info('server shutdown completed')
  })
})
