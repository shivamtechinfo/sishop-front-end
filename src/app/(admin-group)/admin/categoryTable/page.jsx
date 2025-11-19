// components/CategoryTable.jsx
import DeleteBtn from '@/components/admin-components/DeleteBtn';
import StatusBtn from '@/components/admin-components/StatusBtn';
import { getCategories } from '@/library/api-calls';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';

export default async function CategoryTable() {

    // ✅ Null protection + safe URL load
    const category = await getCategories();
    const categories = category?.data || [];   // 🔥 FIXED

    return (
        <div className="bg-white shadow rounded-lg p-6">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <Link href="/admin/categoryTable/add">
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition">
                        + Add Category
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 border-b">
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Slug</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700">
                        {categories.map((cat) => (
                            <tr key={cat._id} className="border-b hover:bg-gray-50">

                                <td className="px-4 py-3">
                                    <img
                                        // ✅ SLASH FIXED
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/category/${cat.image}`}
                                        alt={cat.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>

                                <td className="px-4 py-3">{cat.name}</td>
                                <td className="px-4 py-3">{cat.slug}</td>

                                <td className="px-4 py-3 text-right space-x-2">

                                    <Link href={`/admin/categoryTable/edit/${cat._id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer transition">
                                            <FiEdit className='text-xl' />
                                        </button>
                                    </Link>

                                    {/* ✅ FIXED — url must be FULL API URL */}
                                    <StatusBtn
                                        url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`}
                                        status={cat.status}
                                        id={cat._id}
                                    />

                                    {/* ✅ FIXED — full URL required */}
                                    <DeleteBtn
                                        url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`}
                                        id={cat._id}
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
