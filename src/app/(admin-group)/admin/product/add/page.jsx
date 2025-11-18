import ProductAdd from '@/components/admin-components/ProductAdd';
import { getBrands, getCategories, getColors } from '@/library/api-calls';
// import { getBrands, getCategories, getColors } from '@/library/api-call'

import React from 'react'


export default async function page() {
    const categoryJSON = await getCategories();
    const brandJSON = await getBrands();
    const colorJSON = await getColors();
    return (
        <ProductAdd category={categoryJSON.data} brands={brandJSON.data} colors={colorJSON.data} />
    )
}
