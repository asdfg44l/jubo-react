import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})

export async function HTTP_GET(url, params = {}) {
    try {
        if(params) { params = { params } }
        const res = await instance.get(url, params)
        return res.data
    } catch(e) {
        return Promise.reject(e)
    }
}
