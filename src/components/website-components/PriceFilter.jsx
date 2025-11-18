'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function PriceFilter({ colors }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [price, setPrice] = useState([])

    useEffect(
        ()=> {
            const min = searchParams.get('min')
            const max = searchParams.get('max')
            // console.log(min, max);
            setPrice([Number(min), Number(max)])
            
        },[searchParams]
    )

    function changeHandler(data) {
        // console.log(data);
        setPrice(data)
        const price = new URLSearchParams()
        price.set("min", data[0])
        price.set("max", data[1])
        router.push(`?${price.toString()}`)
    }


    return (
        <div>
            <div className="bg-white p-4 rounded-xl shadow border space-y-4">
                <h2 className="text-lg font-bold">PRICE FILTER</h2>
                <div className='my-6'>
                    <label htmlFor="">{price[0]}</label>
                    <span>-</span>
                    <label htmlFor="">{price[1]}</label>
                </div>
                <RangeSlider min="200" max="200000" value={price} onInput={changeHandler} />
            </div>
        </div>
    )
}
