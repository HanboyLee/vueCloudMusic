// export const API_URL = process.env.NODE_ENV === "development" ? "/api" : BASE_URL;
console.log(process.env.NODE_ENV);
export const API_URL = process.env.NODE_ENV === "development" ? "/api" : "/api";
export const API_TIMEOUT = 40000;
