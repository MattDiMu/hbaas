import { Request, Response } from "express"
import puppeteer from 'puppeteer'
import { getUrlParam } from "../utils"

export async function exportDom(req: Request, resp: Response) {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto(getUrlParam(req), {
    waitUntil: 'networkidle0'
  })
  const html = await page.content()
  await browser.close()
  resp
    .setHeader('Content-Type', 'text/plain')
    .send(html)
}
