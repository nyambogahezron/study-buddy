import { AxiosResponse } from 'axios';
import Axios from '../utils/Axios';

type RegisterUserProps = {
  email: string;
  name: string;
  username: string;
  password: string;
};
// Register a new user
export default async function RegisterUser({
  email,
  password,
  name,
  username,
}: RegisterUserProps) {
  try {
    const response: AxiosResponse = await Axios.post('/register/', {
      email,
      password,
      name,
      username,
    });
    return response;
  } catch (error) {
    return error;
  }
}

//Login a user
export async function LoginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await Axios.post('/login/', {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
}

//Logout a user
export async function LogoutUser() {
  try {
    const response = await Axios.post('/logout/');
    return response;
  } catch (error) {
    return error;
  }
}
