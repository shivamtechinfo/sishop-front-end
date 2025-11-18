'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ColorFilter({ colors }) {
    // console.log(colors, "filter colors");
    

    
    const router = useRouter()
    const [selColor, setSelColor] = useState(null)

    useEffect(
        () => {
            const color = new URLSearchParams({ color: selColor })
            if (selColor) {
                router.push(`?${color.toString()}`)
            }
        },
        [selColor]
    )
    return (
        <div>
            <div className="bg-white p-4 rounded-xl shadow border space-y-4">
                <h2 className="text-lg font-bold">COLOR FILTER</h2>
                <button className="w-full border px-3 py-2 rounded-md font-medium text-sm hover:bg-gray-100">
                    All Colors
                </button>
                <div className="text-sm space-y-1 pl-2">
                    <p className="text-gray-700">Available Colors</p>
                    <ul className="space-y-1  flex gap-3 pl-3 text-gray-500">
                        {
                            colors && colors.map((color) => (
                                <li
                                    onClick={() => setSelColor(color.slug)}
                                    key={color._id}
                                    style={{ background: color.hexcode }}
                                    className="cursor-pointer hover:text-black w-5 h-5 rounded-4xl" ></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
