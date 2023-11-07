import _ from "lodash";

export const isUndefined = (value: any) => value === undefined;

export abstract class ConfigMixin {
  protected storage: Record<string, any>;

  get<T = any>(key: string, defaultValue?: T) {
    const value = _.get(this.storage, key, defaultValue) as T;
    if (!isUndefined(value)) return value;

    const processEnvValue = this.getFromProcessEnv<T>(key, defaultValue);

    if (!isUndefined(processEnvValue)) return processEnvValue;

    return defaultValue as T;
  }

  getOrThrow<T = any>(key: string, defaultValue?: T) {
    const value = this.get(key, defaultValue) as T | undefined;

    if (isUndefined(value))
      throw new TypeError(`Configuration key "${key}" does not exist`);

    return value as Exclude<T, undefined>;
  }

  private getValue(key: string) {
    return process.env[key] ?? "";
  }

  private getFromProcessEnv<T = any>(key: string, defaultValue?: T) {
    return (_.has(process.env, key) ? this.getValue(key) : defaultValue) as T;
  }
}
