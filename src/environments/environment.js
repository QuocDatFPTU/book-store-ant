import buildEnv from "./buildEnv";

export default {
    ...buildEnv({
      API_BASE_URL: process.env.API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV
    })
  };
  