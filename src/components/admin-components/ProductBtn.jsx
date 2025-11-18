'use client'

import { useRouter } from 'next/navigation'
import { axiosInstance, notify } from '@/library/helper'
import React, { useState } from 'react'

export default function ProductBtn({ product }) {
    const [toggle, setToggle] = useState(null)
    const router = useRouter()

    function statusHandler(flag) {
        axiosInstance.patch(`product/status/${product._id}`, { flag }).then(
            (response) => {
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    router.refresh()
                }
            }
        ).catch((error) => {
            console.log(error)
        })
    }
    return (
        <td className="whitespace-nowrap pl-10 py-3 space-x-2">

            <button onClick={() => statusHandler(1)} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                {
                    product.status ?
                        "Active"
                        :
                        "Inactive"
                }
            </button>
            <button onClick={() => statusHandler(2)} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                {
                    product.stock ?
                        "In"
                        :
                        "Out"
                }
            </button>
            <button onClick={() => statusHandler(3)} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                {
                    product.topSelling ?
                        "Yes"
                        :
                        "No"
                }
            </button>
            <button className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                Delete
            </button>
            <button onClick={() => setToggle(product)} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                View
            </button>
            {
                toggle && <ProductView product={product} close={() => setToggle(null)} />
            }
     
        </td>
    )
}


function ProductView({ product, close }) {
    return (
        <div className='w-full p-10 h-[300px] fixed bottom-0 left-0 bg-teal-100'>
            <button onClick={close}>Close</button>
            <div
                className="product-long-description"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
        </div>
    )
}
