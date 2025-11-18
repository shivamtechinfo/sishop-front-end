import { axiosInstance } from "./helper";

const getCategories = async (id = null) => {
    try {
        let API = "category"
        if (id != null) API += `/${id}`
        // console.log(API);

        // http://localhost:5000/category/ //yah to chal rahi broser me
        // http://localhost:5000/category/68b00eca8029bc625c33343f   //yah nahi chal rahi hai
        const response = await axiosInstance.get(API)
        // console.log(response.data, "resp");

        if (response.data.success) {
            return response.data
        } else {
            return null
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}

const getProducts = async (id = null, categorySlug = null, brandSlug = null, colorSlug = null, min = null, max = null) => {
    try {
        let API = "product"
        if (id != null) API += `/${id}`
        const query = new URLSearchParams()
        if (categorySlug) query.append("categorySlug", categorySlug)
        if (brandSlug) query.append("brandSlug", brandSlug)
        if (colorSlug) query.append("colorSlug", colorSlug)
        if (min) query.append("min", min)
        if (max) query.append("max", max)
        const response = await axiosInstance.get(`${API}?${query.toString()}`)
        // console.log(response.data, "resp");

        if (response.data.success) {
            return response.data
        } else {
            return null
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}

const getBrands = async (id = null) => {
    try {
        let API = "brand"
        if (id != null) API += `/${id}`
        // console.log(API);

        // http://localhost:5000/category/ //yah to chal rahi broser me
        // http://localhost:5000/category/68b00eca8029bc625c33343f   //yah nahi chal rahi hai
        const response = await axiosInstance.get(API)
        // console.log(response.data, "resp");

        if (response.data.success) {
            return response.data
        } else {
            return null
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}


const getColors = async (id = null) => {
    try {
        let API = "color"
        if (id != null) API += `/${id}`
        const response = await axiosInstance.get(API)
        if (response.data.success) {
            return response.data
        } else {
            return null
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}


export { getCategories, getColors, getBrands, getProducts }



