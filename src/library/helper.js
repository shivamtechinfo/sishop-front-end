import { ToastContainer, toast } from "react-toastify";

const notify = (msg, flag) => toast(msg, {type: flag ? 'success' : 'error'})
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,  withCredentials: true
})




function createSlug(text) {
    return text
        .toString()              // Ensure it's a string
        .trim()                  // Remove extra spaces
        .toLowerCase()           // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars
        .replace(/\s+/g, '-')          // Replace spaces with dashes
        .replace(/-+/g, '-');          // Replace multiple dashes with single
}



function getCookies(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}


export { createSlug, notify, axiosInstance, getCookies }
