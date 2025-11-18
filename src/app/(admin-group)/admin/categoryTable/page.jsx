// components/CategoryTable.jsx
import DeleteBtn from '@/components/admin-components/DeleteBtn';
import StatusBtn from '@/components/admin-components/StatusBtn';
import { getCategories } from '@/library/api-calls';
import { axiosInstance } from '@/library/helper';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';

export default async function CategoryTable() {
    const category = await getCategories()
    const categories = category.data
    // console.log(categories);

    // Dummy data (you can replace this with real API data)

    return (
        <div className="bg-white shadow rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <Link href="/admin/categoryTable/add">
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition">
                        + Add Category
                    </button>
                </Link>
            </div>

            {/* Table */}
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
                            <tr key={cat.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/category/${cat.image}`}
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

                                    <StatusBtn url="category" status={cat.status} id={cat._id} />

                                    <DeleteBtn url="category" id={cat._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
