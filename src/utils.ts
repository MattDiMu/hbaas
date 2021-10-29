import { Request } from "express";

export function getUrlParam(req: Request) {
  console.debug('rendering url' + req.query.url)
  return req.query.url as string
}
