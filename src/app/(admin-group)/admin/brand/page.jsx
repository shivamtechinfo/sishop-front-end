// components/CategoryTable.jsx
import DeleteBtn from '@/components/admin-components/DeleteBtn';
import StatusBtn from '@/components/admin-components/StatusBtn';
import { getBrands  } from '@/library/api-calls';
import { axiosInstance } from '@/library/helper';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';

export default async function CategoryTable() {
    const brandsJSON = await getBrands()
    const brands = brandsJSON.data
    console.log(brands);

    // Dummy data (you can replace this with real API data)

    return (
        <div className="bg-white shadow rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <Link href="/admin/brand/add">
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
                        {brands.map((brand) => (
                            <tr key={brand.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brand/${brand.image}`}
                                        alt={brand.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-3">{brand.name}</td>
                                <td className="px-4 py-3">{brand.slug}</td>
                                <td className="px-4 py-3 text-right space-x-2">

                                    <Link href={`/admin/brand/edit/${brand._id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer transition">
                                            <FiEdit className='text-xl' />
                                        </button>
                                    </Link>

                                    <StatusBtn url="brand" status={brand.status} id={brand._id} />

                                    <DeleteBtn url="brand" id={brand._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
