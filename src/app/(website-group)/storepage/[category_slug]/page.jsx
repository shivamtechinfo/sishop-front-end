import ProductCard from '@/components/website-components/ProductCard'
import { getProducts } from '@/library/api-calls'
import React from 'react'

export default async function page({params, searchParams}) {
    const productJSON = await getProducts(null, params.category_slug, searchParams.brand ?? null, searchParams.color ?? null, searchParams,min || null, searchParams.max || null)
    const products = productJSON.data
    
    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                products.map((product) => (
                    <ProductCard key={product._id}  product={product} />
                ))
            }
        </div>
    )
}
