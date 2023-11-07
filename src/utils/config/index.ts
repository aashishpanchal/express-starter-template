import _ from "lodash";
import path from "path";
import * as dotenv from "dotenv";
import { ConfigMixin } from "./mixin";
import { Options, IConfig } from "./interfaces";

export class Config extends ConfigMixin implements IConfig {
  protected storage: Record<string, any> = {};

  constructor(private options: Options) {
    super();
    this.options = _.defaultsDeep(options, {
      loads: [],
      path: path.join(process.cwd(), ".env"),
    });

    // load env file
    this.storage = this.loadEnvFile();
    // load function and merge with storage
    this.storage = _.merge(this.storage, this.loadFunc());
  }

  private loadFunc() {
    // load function
    let config: Record<string, any> = {};
    // if, load is array
    if (Array.isArray(this.options.loads)) {
      this.options.loads.forEach((load) => {
        // check load is function
        if (typeof load !== "function") throw new Error("load is not function");
        // deep marge
        config = _.merge(config, load());
      });
    } else if (typeof this.options.loads === "function")
      config = this.options.loads();

    return config;
  }

  private loadEnvFile(options?: Omit<dotenv.DotenvConfigOptions, "path">) {
    let config: Record<string, any> = {};
    // if, path is array
    if (Array.isArray(this.options.path)) {
      this.options.path.forEach((path) => {
        const { error, parsed } = dotenv.config({ ...options, path });
        // throw errors
        if (error) throw error;
        // deep marge
        config = _.merge(config, parsed);
      });
    }

    // path is string
    else {
      const { error, parsed } = dotenv.config({
        ...options,
        path: this.options.path,
      });
      // throw errors
      if (error) throw error;
      // deep marge
      config = _.merge(config, parsed);
    }

    return config;
  }
}
