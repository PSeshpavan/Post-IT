import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const timeLeft = decoded.exp * 1000 - currentTime;

    return timeLeft > 0 ? timeLeft : 0;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export default isTokenExpired;
