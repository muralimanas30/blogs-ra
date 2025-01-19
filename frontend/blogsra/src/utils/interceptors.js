import axios from 'axios'

const authHeaderIncluder = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
})
authHeaderIncluder.interceptors.request.use((req)=>{
    
    console.log("reqest sent")
    return req;
},(error)=>{
    return Promise.reject(error)
})

authHeaderIncluder.interceptors.response.use((res)=>{
    
    //nothing to do 
    return res;
},(error)=>{
    console.log(error.response)
})

export default authHeaderIncluder