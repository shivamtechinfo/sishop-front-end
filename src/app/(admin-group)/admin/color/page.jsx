// components/CategoryTable.jsx
import DeleteBtn from '@/components/admin-components/DeleteBtn';
import StatusBtn from '@/components/admin-components/StatusBtn';
import { getColors } from '@/library/api-calls';
import { axiosInstance } from '@/library/helper';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';

export default async function ColorTable() {
    const colorJSON = await getColors()
    const colors = colorJSON.data
    // console.log(colors);

    // Dummy data (you can replace this with real API data)

    return (
        <div className="bg-white shadow rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <Link href="/admin/color/add">
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition">
                        + Add color
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
                        {colors.map((color) => (
                            <tr key={color.id} className="border-b hover:bg-gray-50">
                                <td
                                style={{background : color.hexcode}}
                                className="px-4 py-3">
                                  
                                </td>
                                <td className="px-4 py-3">{color.name}</td>
                                <td className="px-4 py-3">{color.slug}</td>
                                <td className="px-4 py-3 text-right space-x-2">

                                    <Link href={`/admin/categoryTable/edit/${color._id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer transition">
                                            <FiEdit className='text-xl' />
                                        </button>
                                    </Link>

                                    <StatusBtn url="color" status={color.status} id={color._id} />

                                    <DeleteBtn url="color" id={color._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
