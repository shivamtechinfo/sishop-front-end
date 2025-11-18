'use client'

import { axiosInstance, notify } from '@/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2'


export default function DeleteBtn({ id, url }) {

  const router = useRouter()
  function deleteHandler() {
    //confirm message code start
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      //confirm message code end
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        axiosInstance.delete(`${url}/delete/${id}`).then(
          (response) => {
            notify(response.data.message, response.data.success)
            console.log(response.data.message, response.data.success);

            if (response.data.success) {
              router.refresh()
            }
          }
        ).catch((error) => {
          console.log(error)
        })
      }
    });

  }

  return (
    <button onClick={deleteHandler} className="text-red-600 hover:text-red-800 transition rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-gray-200">
      <FiTrash2 />
    </button>
  )
}

