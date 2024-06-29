// services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

const login = (username, password) => {
  return axios
    .post(API_URL + '/user/login', {
      username,
      password,
    }, {withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
      if (response.data.token) {

        localStorage.setItem('user', JSON.stringify(response.data['token']));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

function getToken() {
  return JSON.parse(localStorage.getItem('user'));
}

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
};
