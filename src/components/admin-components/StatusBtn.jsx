'use client'
import React from 'react'
import { axiosInstance, notify } from '@/library/helper'
import { Router } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function StatusBtn({ id, status, url }) {
    const router = useRouter()
    function statusHandler() {
        axiosInstance.patch(`${url}/status/${id}`).then(
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
        <button onClick={statusHandler} className="rounded-md cursor-pointer bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
            {
                status ?
                    "Active"
                    :
                    "Inactive"
            }
        </button>
    )
}
