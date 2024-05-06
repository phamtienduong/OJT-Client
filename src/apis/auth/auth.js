import { message, notification } from "antd";
import publicAxios from "../../config/publicAxios";
import { API_LOGIN, API_LOGIN_FACEBOOK, API_LOGIN_GOOGLE, API_MAILER, API_REGISTER, API_RESET_PASSWORD } from "../patchApi";
export const loginApi = async (body) => {
  try {
    const response = await publicAxios.post(API_LOGIN, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
};
export const registerApi = async (body) => {
  try {
    const response = await publicAxios.post(API_REGISTER, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
}
export const loginGoogle = async (body) => {
  try {
    const response = await publicAxios.post(API_LOGIN_GOOGLE, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
}
export const loginFacebook = async (body) => {
  try {
    const response = await publicAxios.post(API_LOGIN_FACEBOOK, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
}
export const mailerApi = async (body) => {
  try {
    const response = await publicAxios.post(API_MAILER, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
}
export const resetPassword = async (body) => {
  try {
    const response = await publicAxios.post(API_RESET_PASSWORD, body);
    return response.data;
  } catch (error) {
    notification.error({
      message: error.response.data.message,
    })
  }
}

