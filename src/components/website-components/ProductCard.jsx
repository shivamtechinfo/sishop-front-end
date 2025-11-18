import React from 'react'

export default function ProductCard({ product }) {

    const { name, finalPrice, discountPercentage, originalPrice, thumbnail, colors } = product;

    // console.log(colors, "products color");



    return (
        <div>
            <div className="w-full max-w-xs bg-white border rounded-xl shadow hover:shadow-lg transition p-4 space-y-4">
                {/* Product Image with 'Top' Badge */}
                <div className="relative">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                        alt="Product Thumbnail"
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Top
                    </span>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    {/* Description */}
                    <h2 className="text-sm text-gray-700 font-medium line-clamp-2">
                        {name}
                    </h2>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through text-sm">₹{originalPrice}</span>
                        <span className="text-red-600 font-semibold text-base">₹{finalPrice}</span>
                    </div>

                    {/* Color Options */}
                    <div className="flex items-center gap-2">


                        {

                            colors?.map((color) => {
                                return <span
                                key={color._id}
                                 style={{ background: color.hexcode }} className="w-5 h-5 rounded-full cursor-pointer border"></span>
                            })
                        }

                    </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition">
                    Add to Cart
                </button>
            </div>

        </div>
    )
}
