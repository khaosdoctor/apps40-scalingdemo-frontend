'use strict'
import Vue from 'vue'
import axios from 'axios'

const config = {
  baseURL: ''
}

Plugin.install = async function (Vue, options) {
  const { data } = await axios.get('/config.json')
  config.baseURL = data.API_URL

  const _axios = axios.create(config)
  Vue.axios = _axios
  window.axios = _axios

  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
