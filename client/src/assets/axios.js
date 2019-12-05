import axios from 'axios'
import constants from './constants/constants'
import store from '../store/store'

axios.defaults.baseURL = constants.API_ADDRESS

// add token to Auth header if onceLogged
if (JSON.parse(window.localStorage.getItem('authUser'))!= null)
{
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(window.localStorage.getItem('authUser')).token
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let snackbar = {
    show: true,
    color: "error",
    text: ""
  }
  if (error.response) {
    if (error.response.status >= 400) {
      snackbar.text = error.response.data.message
      store.commit("root/SNACKBAR", snackbar);
    }
    else {
      snackbar.text = "Error en la petición"
      store.commit("root/SNACKBAR", snackbar);
    }
  }
  else if (error.request) {
    snackbar.text = "Se ha perdido la conexión con el servidor"
    store.commit("root/SNACKBAR", snackbar)
  }
  return Promise.reject(error);
});