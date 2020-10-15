import axios from 'axios'
const { IP } = require('../../helper/env')

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    console.log(state)
    // eslint-disable-next-line quotes
    if (state.token !== null && state.token !== "undefined") {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${IP}/api/v1/users/login`, payload)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('refreshtoken', response.data.data.refreshToken)
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${IP}/api/v1/users/register`, payload)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      resolve('Logout Success')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
