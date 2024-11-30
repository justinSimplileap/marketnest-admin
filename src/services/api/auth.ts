import AxiosInstance from '../ApiRequests';

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await AxiosInstance.post('/auth/login', data);
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (data: {
  userName: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await AxiosInstance.post('/auth/signup', data);
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
