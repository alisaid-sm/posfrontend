import axios from 'axios'
const { IP } = require('../../helper/env')

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    }
  }
}

const getters = {
  getAllProduct (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}

const actions = {
  getAllProduct (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${IP}/api/v1/product/getall`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  addProduct (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${IP}/api/v1/product/insert`, payload)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  delProduct (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.delete(`${IP}/api/v1/product/delete/${payload}`)
        .then((response) => {
          console.log(response.data)
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },
  updateProduct (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.put(`${IP}/api/v1/product/update/${payload.id}`, payload.data)
        .then((response) => {
          console.log(response.data)
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
