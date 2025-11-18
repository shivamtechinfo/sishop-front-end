
'use client'
import { getCategories } from '@/library/api-calls';
import { createSlug, notify, axiosInstance } from '@/library/helper';
import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react'
import { FaRegImage } from "react-icons/fa6";

export default function categoryEdit({ params }) {
    const [category, setCategory] = useState({})
    const nameRef = useRef()
    const slugRef = useRef()

    async function getCategory() {
        const categoryJSON = await getCategories(params?.category_id)
      
        
        console.log(categoryJSON.data, "data");
        
        setCategory(categoryJSON.data)
    }

    useEffect(() => {
        getCategory()
    }, [params.category_id])

    function generateSlug() {
        // console.log(nameRef.current.value);
        const slug = createSlug(nameRef.current.value)
        // console.log(slug);
        slugRef.current.value = slug
    }




    function submitHandler(e) {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("slug", slugRef.current.value)
        formData.append("image", e.target.category_image.files[0])

        axiosInstance.put(`category/update/${category._id}`, formData).then(
            (response) => {
                // console.log(response.data.success);
                notify(response.data.message, { flag: response.data.success })
                if (response.data.success); {
                    nameRef.current.value = ""
                    slugRef.current.value = ""
                }


            }
        ).catch((error) => {
            console.log(error);

        })

    }

    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category Name :
                    </label>
                    <input
                        type="text"
                        id="text"
                        ref={nameRef}
                        defaultValue={category.name}
                        onChange={generateSlug}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Category name"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="slug"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Slug :
                    </label>
                    <input
                        type="text"
                        id="slug"
                        ref={slugRef}
                        defaultValue={category.slug}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='slug'
                        required=""
                    />
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                    >
                        Upload file
                    </label>
                    <div className=" w-full flex flex-col items-center justify-center text-sm h-30 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" >
                        <input
                            id="file_input"
                            type="file"
                            name="category_image"
                        />
                        <FaRegImage className='text-5xl' />
                    </div>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/category/${category.image}`}
                        alt={category.name}
                        className="h-10 w-10 rounded objec t-cover shadow"
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>

        </div>
    )
}

