import { env } from "process";

const CONFIG = {
  port: env.HBAAS_PORT || 8080,
}


export default CONFIG
