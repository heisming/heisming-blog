import axios from 'axios'

const dev = true
const baseUrl = dev ? 'http://127.0.0.1:7001/admin/' : 'www.heisming.com'

const instance = axios.create({
  baseUrl,
  timeout: 5000
})

export const get = (url, params = {}) => {
  // 封装一次Promise返回
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }
    )
  })
}

export const post = (url, data = {}) => {
  // 封装一次Promise返回
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }
    )
  })
}
  

