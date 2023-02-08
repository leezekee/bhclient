import axios from "axios"

const request = axios.create({
  // baseURL: '/api',
  baseURL: 'http://39.106.127.16:7001',
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // }
}) 

export default request