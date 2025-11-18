'use client'
import { axiosInstance, notify } from '@/library/helper';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminLogin = () => {

  const router = useRouter()

  function loginHandler(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    axiosInstance.post('admin/login', data, { withCredentials : true }).then(
      (response) => {
        notify(response.data.message, response.data.success)
        if (response.data.success) {
          // console.log(response.data)
          router.push('/admin')
        }
      }
    ).catch(
      (error) => {
        notify("Something else", 0)
      }
    ) 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        <form onSubmit={loginHandler} className="space-y-5"  >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              name='password'
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
