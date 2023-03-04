import Cookies from "js-cookie";
export const tokenFind = ()=>{
    var token = Cookies.get("token");
    console.log("token" ,token)
}
export const getToken = () => Cookies.get("token");
// export const isAuthenticated = () => !!getToken();
export const isAuthenticated = () =>{
    tokenFind()
    return true;
}

