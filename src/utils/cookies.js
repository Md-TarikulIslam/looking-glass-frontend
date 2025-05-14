import Cookies from 'js-cookie';

export const setRefreshToken = (token) => {
  Cookies.set('refreshToken', token, { expires: 30 }); 
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const removeRefreshToken = () => {
  Cookies.remove('refreshToken');
};