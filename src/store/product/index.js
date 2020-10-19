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
  },
  SET_SEARCH (state, payload) {
    state.all.data = payload
  },
  SET_SORT (state, payload) {
    state.all.data = payload
  }
}

const actions = {
  getAllProduct (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    const fd = {
      limit: payload.limit === undefined ? '' : payload.limit,
      page: payload.page === undefined ? '' : payload.page
    }
    return new Promise((resolve, reject) => {
      axios.get(`${IP}/api/v1/product/getall?limit=${fd.limit}&page=${fd.page}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
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
    return new Promise((resolve, reject) => {
      axios.delete(`${IP}/api/v1/product/delete/${payload}`)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  updateProduct (context, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${IP}/api/v1/product/updatepatch/${payload.id}`, payload.data)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  async searchProduct (context, payload) {
    try {
      const result = await axios.get(`${IP}/api/v1/product/getall?search=${payload}`)
      context.commit('SET_SEARCH', result.data.data, payload)
    } catch (error) {
    }
  },
  async sortProduct (context, payload) {
    try {
      const result = await axios.get(`${IP}/api/v1/product/getall?sort=${payload.sort}&sorttype=${payload.sorttype}`)
      context.commit('SET_SORT', result.data.data, payload)
    } catch (error) {
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
