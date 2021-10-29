import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { getUrlParam } from "../utils";

export async function convertToPdf(req: Request, resp: Response) {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto(getUrlParam(req), {
    waitUntil: 'networkidle0'
  })
  const pdf = await page.pdf({
    format: 'a4'
  })
  await browser.close()
  resp
    .setHeader('Content-Type', 'application/pdf')
    .setHeader('Content-Disposition', 'inline; filename="webpage.pdf"')
    .send(pdf)
}
