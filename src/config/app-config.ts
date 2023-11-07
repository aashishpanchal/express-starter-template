export function appConfig() {
  const secret = process.env["SECRET"];

  const node_env = process.env["NODE_ENV"] || "development";

  const is_dev = node_env === "development";

  return {
    app: {
      is_dev,
      secret,
      node_env,
      name: process.env["NAME"],
      host: process.env["HOST"],
      port: Number(process.env["PORT"]),
    },
    database_uri: process.env["DATABASE_URI"],
  };
}
