import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { getUrlParam } from "../utils";

export async function convertToImage(req: Request, resp: Response) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-dev-shm-usage'], // fix for memory usage in docker image
  })
  const page = await browser.newPage()
  await page.goto(getUrlParam(req), {
    waitUntil: 'networkidle0'
  })
  const image = await page.screenshot({
    fullPage: true,
    type: 'jpeg',
    quality: 80
  })
  await browser.close()
  resp
    .setHeader('Content-Type', 'image/jpeg')
    .setHeader('Content-Disposition', 'inline; filename="webpage.jpeg"')
    .send(image)
}
