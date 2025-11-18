'use client'

import React, { useState } from "react";
import { useRef } from "react";
import { axiosInstance, notify, createSlug } from "@/library/helper";
import Select from 'react-select'
import TextEditor from "@/app/(admin-group)/admin/TextEditor";

export default function ProductAdd({ category, colors, brands }) {
    const [selcolor, setSelcolor] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [longDescription, setlongDescription] = useState(null)


    const nameRef = useRef();
    const slugRef = useRef();
    const originalRef = useRef();
    const discountPercentageRef = useRef();
    const finalRef = useRef();


    function generateSlug() {
        const slug = createSlug(nameRef.current.value);
        slugRef.current.value = slug;
    }

    function submitHandler(e) {
        e.preventDefault();
        // const data = {
        //     name: nameRef.current.value,
        //     slug: slugRef.current.value
        // };
        // console.log(e.target.category_image.files[0]);
        // return

        const formData = new FormData();
        formData.append("name", nameRef.current.value,)
        formData.append("slug", slugRef.current.value,)
        formData.append("shortDescription", e.target.shortDescription.value,)
        // formData.append("longDescription", e.target.longDec.value)
        formData.append("longDescription", longDescription)
        formData.append("originalPrice", originalRef.current.value,)
        formData.append("discountPercentage", discountPercentageRef.current.value,)
        formData.append("finalPrice", finalRef.current.value,)
        // formData.append("categoryId", e.target.categoryId.value,)
        formData.append("categoryId", selectedCategory?.value)
        // formData.append("brandId", e.target.brand.value,)
        formData.append("brandId", selectedBrand?.value)
        formData.append("colors", JSON.stringify(selcolor))
        formData.append("thumbnail", slugRef.current.value,)
        formData.append("thumbnail", e.target.thumbnail.files[0])
        for (let img of e.target.images.files) {
            formData.append("images", img)
        }


        // axios.post("http://localhost:5000/category/create", data) //yanha data use kiya gaya hai
        axiosInstance.post("product/create", formData) // data ki jagah formData use kiya gaya hai
            .then((response) => {
                // console.log(response.data);
                // console.log(response.data.success);
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    nameRef.current.value = ""
                    slugRef.current.value = ""
                }


            })
            .catch((error) => {
                console.log(error);
            });
    }


    function priceCalculate() {
        const op = originalRef.current.value;
        const dp = discountPercentageRef.current.value;
        const fp = op - (op * dp) / 100;
        finalRef.current.value = parseInt(fp);
    }


    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow"
            >
                {/* Product Name */}
                <input
                    type="text"
                    ref={nameRef}
                    onChange={generateSlug}
                    name="name"
                    placeholder="Product Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />

                {/* Slug */}
                <input
                    type="text"
                    ref={slugRef}
                    readOnly
                    name="slug"
                    placeholder="Slug"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />

                {/* Short Description */}
                <textarea
                    name="shortDescription"
                    placeholder="Short Description"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 md:col-span-2"
                    rows="2"
                />

                {/* Long Description */}
                {/* <textarea
                    name="longDec"
                    placeholder="Long Description"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 md:col-span-2"
                    rows="4"
                /> */}

                <TextEditor value={longDescription} changeHandler={(data)=> setlongDescription(data)}/>

                {/* Pricing Row */}
                <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                    <input
                        type="number"
                        ref={originalRef}
                        onChange={priceCalculate}
                        name="originalPrice"
                        placeholder="Original Price"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="number"
                        ref={discountPercentageRef}
                        onChange={priceCalculate}
                        name="discountPercentage"
                        placeholder="Discount Percentage"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <input
                        type="number"
                        name="finalPrice"
                        ref={finalRef}
                        readOnly
                        placeholder="Final Price"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                {/* Category / Brand / Colors Row */}
                <div className="md:col-span-2 flex h-10 flex-col md:flex-row gap-4">
                    {/* Category Select */}
                    {/* <Select options={options} />
                    <select
                        name="categoryId"
                        className="w-full border border-gray-300 rounded-md px-4"
                    >
                        <option value="">Select Category</option>
                        {category?.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select> */}
                    <Select
                        placeholder="category"
                        instanceId="category-select"
                        className="w-full border border-gray-300 rounded-md px-4"
                        options={
                            category.map((cat) => {
                                return { value: cat._id, label: cat.name }
                            })
                        }
                        value={selectedCategory}
                        onChange={(option) => setSelectedCategory(option)}
                    />

                    {/* <select
                        name="brandId"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    >
                        <option value="">Select Brand</option>
                        {brands?.map((brand) => (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select> */}
                    <Select
                        placeholder="brands"
                        instanceId="brand-select"
                        className="w-full border border-gray-300 rounded-md px-4"
                        options={
                            brands.map((cat) => {
                                return { value: cat._id, label: cat.name }
                            })
                        }
                        value={selectedBrand}
                        onChange={(option) => setSelectedBrand(option)}
                    />

                    {/* Color Multi-Select */}
                    {/* <select
                        name="colors"
                        multiple
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    >
                        {colors?.map((color) => (
                            <option key={color._id} value={color._id}>{color.name}</option>
                        ))}
                    </select> */}
                    <Select
                        placeholder="color"
                        instanceId="color-select"
                        className="w-full border border-gray-300 rounded-md px-4"
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={(data) => {
                            const color = data.map(o => o.value)
                            setSelcolor(color)
                        }}
                        options={
                            colors.map((col) => {
                                return { value: col._id, label: col.name }
                            })
                        }
                    />
                </div>



                {/* Thumbnail */}
                <input
                    type="file"
                    name="thumbnail"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />

                {/* Images */}
                <input
                    type="file"
                    name="images"
                    multiple
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />

                {/* Stock */}
                <select
                    name="stock"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                {/* Top Selling */}
                <select
                    name="topSelling"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>

                {/* Status */}
                <select
                    name="status"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                {/* Submit Button */}
                <div className="md:col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                    >
                        Submit Product
                    </button>
                </div>
            </form>

        </div>
    );
}


