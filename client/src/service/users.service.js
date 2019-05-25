import axios from 'axios';

const url = "http://localhost:5000/users";

class UserService{
  // Создать пользователя
  static createUser(payload){
    return axios.post(`${url}/register`,payload);
  }
  // Логин пользователя
  static loginUser(payload){
    return axios.post(`${url}/login`,payload);
  }
}

export default UserService;