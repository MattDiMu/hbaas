import { env } from "process";

const CONFIG = {
  port: env.HBAAS_PORT || 8080,
  // other configuration could be added the same way as well
}


export default CONFIG
