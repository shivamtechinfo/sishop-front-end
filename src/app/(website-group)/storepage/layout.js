
import CategoryFilter from "@/components/website-components/CategoryFilter";
import BrandFilter from "@/components/website-components/BrandFilter";
import ColorFilter from "@/components/website-components/ColorFilter";
import PriceFilter from "@/components/website-components/PriceFilter";
import { getBrands, getCategories, getColors } from "@/library/api-calls";

export default async function RootLayout({ children }) {
    {/* 🧭 get categories */ }
    const categoryJSON = await getCategories(null)
    const categories = categoryJSON.data

    {/* 🧭 get brands */ }
    const brandsJSON = await getBrands(null)
    const brands = brandsJSON.data

    {/* 🧭 get colors */ }
    const colorJSON = await getColors(null)
    const colors = colorJSON.data
    

    return (
        <html lang="en">
            <body>
                <div className="space-y-10 p-5 bg-gray-50">
                    {/* 🧭 Breadcrumb Section */}
                    <section className="border rounded-md p-4 bg-white shadow">
                        <ol className="flex items-center whitespace-nowrap space-x-2">
                            <li className="inline-flex items-center">
                                <a className="text-sm text-gray-500 hover:text-blue-600" href="#">
                                    Home
                                </a>
                                <svg
                                    className="mx-2 w-4 h-4 text-gray-400"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                                </svg>
                            </li>
                            <li className="inline-flex items-center">
                                <a className="text-sm text-gray-500 hover:text-blue-600" href="#">
                                    Shop
                                    <svg
                                        className="mx-2 w-4 h-4 text-gray-400"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                                    </svg>
                                </a>
                            </li>
                            <li className="text-sm font-semibold text-gray-800 truncate">
                                Top Cell Phones & Tablets
                            </li>
                        </ol>
                    </section>

                    {/* 📱 Top Cell Phones & Tablets Section */}
                    <section className="border rounded-md p-4 bg-white shadow">
                        <h1 className="text-xl font-bold uppercase mb-4">Top Cell Phones & Tablets</h1>
                        <div className="flex flex-wrap gap-5">
                            <div className="relative w-full sm:w-[48%] h-80">
                                <img src="store/top cell phones & tablets/slider3.png" alt="" className="w-full h-full object-cover rounded-md" />
                                <div className="absolute top-10 left-10 space-y-3 text-white">
                                    <h1 className="text-2xl font-bold">Noise Cancelling</h1>
                                    <h3 className="text-lg">Headphone</h3>
                                    <p className="text-sm leading-tight">Boso Over-Ear Headphone <br />Wifi, Voice Assistant,<br />Low latency game mode</p>
                                    <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold">BUY NOW</button>
                                </div>
                            </div>

                            <div className="relative w-full sm:w-[48%] h-80">
                                <img src="store/top cell phones & tablets/banner1.png" alt="" className="w-full h-full object-cover rounded-md" />
                                <div className="absolute top-10 left-10 space-y-2 text-black">
                                    <h1 className="text-2xl font-bold">Redmi Note 12 <br />Pro+ 5G</h1>
                                    <p className="text-sm text-gray-600">Rise to the challenge</p>
                                    <button className="mt-2 px-4 py-2 bg-black text-white rounded-lg">SHOP NOW</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 🗂️ Popular Categories Section */}
                    <section className="border rounded-md p-4 bg-white shadow">
                        <h1 className="text-xl font-bold uppercase mb-4">Popular Categories</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[
                                { title: "iPhone (iOS)", items: 74, image: "iphone" },
                                { title: "Android", items: 34, image: "android" },
                                { title: "5G Support", items: 12, image: "5gsupport" },
                                { title: "Apple Tablets", items: 22, image: "apptablet" },
                                { title: "Smartphone Chargers", items: 33, image: "smartphone_chargers" },
                                { title: "Gaming", items: 9, image: "gaming" },
                                { title: "Xiaomi", items: 52, image: "xiaomi" },
                                { title: "Accessories", items: 29, image: "accessories" },
                                { title: "Samsung Tablets", items: 26, image: "samsung" },
                                { title: "eReader", items: 5, image: "eReader" }
                            ].map((cat, i) => (
                                <div key={i} className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                                    <div>
                                        <h1 className="font-semibold">{cat.title}</h1>
                                        <p className="text-sm text-gray-500">{cat.items} Items</p>
                                    </div>
                                    <img src={`store/popular_categories/${cat.image}.png`} alt={cat.title} className="w-16 h-16 object-contain" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 🧩 Content Area (children) */}
                    <section className="border rounded-md p-6 bg-white shadow">
                        <h1 className="text-xl font-bold mb-4">Main Content Area</h1>

                        <div className="flex w-full gap-6">
                            {/* Left Sidebar: Filters */}
                            <div className="w-1/4 space-y-6">
                                {/* Categories Filter */}
                                <CategoryFilter categories={categories} />

                                {/* Brand Filter */}
                                <BrandFilter brands={brands} />
                                {/* Color Filter */}
                                <ColorFilter  colors={colors}/>
                                {/* Price Filter */}
                                <PriceFilter />

                            </div>

                            {/* Right Main Content */}
                            <div className="w-3/4 bg-red-400 p-4 rounded-md">
                                {children}
                            </div>
                        </div>
                    </section>

                </div>
            </body>
        </html>
    );
}
