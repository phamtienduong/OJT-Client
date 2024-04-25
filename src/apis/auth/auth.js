import publicAxios from "../../config/publicAxios";
import { API_LOGIN, API_REGISTER } from "../patchApi";
export const loginApi = async (body) => {
  console.log(body);
  try {
    const response = await publicAxios.post(API_LOGIN, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const registerApi = async (body) => {
  console.log(body);
  try {
    const response = await publicAxios.post(API_REGISTER, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
