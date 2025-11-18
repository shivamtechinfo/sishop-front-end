import ProductCard from '@/components/website-components/ProductCard'
import { getProducts } from '@/library/api-calls'
import React from 'react'

export default async function page({searchParams}) {
   
    const brand = searchParams.brand ?? null
    const color = searchParams.color ?? null
    const min = searchParams.min ?? null
    const max = searchParams.max ?? null
    const productJSON = await getProducts(null, null,  brand, color, min, max)
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
