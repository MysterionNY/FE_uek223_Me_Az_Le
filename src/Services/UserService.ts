import api from '../config/Api';
import {RegisterUser, User} from '../types/models/User.model';

const UserService = {
  getUser: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },

  updateUser: (user: User) => {
    // Backend expects UserDTO without id field
    // The backend will handle preserving password and blogposts
    const { id, ...userDTO } = user;

    console.log('Updating user with ID:', id);
    console.log('Sending DTO:', userDTO);
    return api.put(`/user/${id}`, userDTO);
  },

  addUser: (user: User) => {
    return api.post('/user/registerUser', user).then((res) => {
      return res.data;
    });
  },

  registerUser: (user: RegisterUser) => {
    return api.post(`/user/register`, user);
  },

  getAllUsers: () => {
    return api.get(`/user`);
  },

  deleteUser: (id: string) => {
    return api.delete(`/user/${id}`);
  },
};

export default UserService;
