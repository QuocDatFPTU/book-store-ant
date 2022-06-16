export default function ({} = {}) {
  return {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    api: {
      login: "user/login",

      categoryList: "/category/get-all"
    },
    isDevelopment: NODE_ENV === "development"
  };
}
