import Cookies from "js-cookie";

export const getToken = () => Cookies.get("token");
export const isAuthenticated = () => !!getToken();

