import axios from "../utils/axois-client";
import {
  API_CONTENT,
  API_LOGIN,
  API_LOGIN_WITH_FACEBOOK,
  API_LOGIN_WITH_GOOGLE,
  API_ME,
  API_REGISTER,
} from "../utils/constant-url";

export const loginWithGoogle = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(API_LOGIN_WITH_GOOGLE, data);
    localStorage.setItem("token", response.data?.data?.token);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
};

export const register = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(API_REGISTER, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw error;
  }
};
export const login = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(API_LOGIN, data);
    localStorage.setItem("token", response.data?.data?.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
};
export const loginFacebook = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(API_LOGIN_WITH_FACEBOOK, data);
    localStorage.setItem("token", response.data?.data?.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
};
export const fetchContent = async () => {
  try {
    const response = await axios.get(API_CONTENT);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching content");
    }
    throw error;
  }
};
export const fetchMe = async () => {
  try {
    const response = await axios.get(API_ME);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching me");
    }
    throw error;
  }
};
