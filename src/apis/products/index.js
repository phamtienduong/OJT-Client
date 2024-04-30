import publicAxios from "../../config/publicAxios";
import { API_PRODUCT } from "../patchApi";

export const createProductApi = async (data) => {
    try {
        let res = await publicAxios.post(API_PRODUCT, data)
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const getAllProductsApi = async (query) => {
    try {
        let res = await publicAxios.get(`${API_PRODUCT}/?search=${query}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}
export const getOneProductApi = async (id) => {
    try {
        let res = await publicAxios.get(`${API_PRODUCT}/${id}`);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const updateProductApi = async (id, body) => {
    try {
        let res = await publicAxios.patch(`${API_PRODUCT}/${id}`, body);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const deleteProductApi = async (id) => {
    try {
        let res = await publicAxios.delete(`${API_PRODUCT}/${id}`);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const updateImgProductApi = async (body) => {
    try {
        let res = await publicAxios.put(`${API_PRODUCT}/update-impds`, body);
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const getProductsByCategoryApi = async (cateId) => {
    try {
        let res = await publicAxios.get(`${API_PRODUCT}/?category=${cateId}`)
        return res;
    } catch (err) {
        console.log(err)
    }
}