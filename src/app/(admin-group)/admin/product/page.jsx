
// components/CategoryTable.jsx
import ProductBtn from '@/components/admin-components/ProductBtn';
import DeleteBtn from '@/components/admin-components/DeleteBtn';
import StatusBtn from '@/components/admin-components/StatusBtn';
import { getProducts } from '@/library/api-calls';
import { axiosInstance } from '@/library/helper';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import ProductView from '@/components/admin-components/ProductView';

export default async function product() {
  const product = await getProducts()
  const products = product.data
  // console.log(products);



  // Dummy data (you can replace this with real API data)

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <Link href="/admin/product/add">
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
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.slug}</td>
                <td className="px-4 py-3 text-right space-x-2">

                  <ProductBtn product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}



