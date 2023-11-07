export type LoadFunc = () => Record<string, any>;

export type Options = {
  path?: string | string[];
  loads?: Array<LoadFunc> | LoadFunc;
};

export interface IConfig {}
