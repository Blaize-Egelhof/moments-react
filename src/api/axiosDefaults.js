import axios from "axios";

// This base URL is the url of the launched API,
axios.defaults.baseURL = "https://p5-practice-6078ead39962.herokuapp.com/"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true;

// we use access and refresh tokens in order to keep users signed in , 

// access tokens last 5 minutes while refres tokens last 24 hrs , basically we going to catch expired access tokes and issue new ones to our API when making requests to keep users logged in 

// request from api
export const axiosReq =axios.create() 
// response from api
export const axiosRes =axios.create() 
