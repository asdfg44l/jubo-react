import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
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

export async function HTTP_POST(url, params) {
    try {
        const res = await instance.post(url, params)
        return res.data
    } catch(e) {
        return Promise.reject(e)
    }
}

export async function HTTP_PUT(url, params) {
    try {
        const res = await instance.put(url, params)
        return res.data
    } catch(e) {
        return Promise.reject(e)
    }
}

export async function HTTP_DELETE(url, params = {}) {
    try {
        if(params) { params = { params } }
        const res = await instance.delete(url, params)
        return res.data
    } catch(e) {
        return Promise.reject(e)
    }
}