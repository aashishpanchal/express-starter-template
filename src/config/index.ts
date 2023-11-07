import { Config } from "@/utils/config";
import { appConfig } from "./app-config";

const config = new Config({ path: ".env", loads: [appConfig] });

export default config;

// you can get env var, use config.get("key"), config.getOrThrow("key.sub-key")
