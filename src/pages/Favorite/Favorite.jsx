import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function Favorite() {
    const products = [
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
    ];

    const listFavor = () => {};
    return (
        <>
            <Header></Header>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Wishlist (4)
                        </h2>
                        <button class="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-1/4 tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            Add all to cart
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0"
                                                />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.color}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {product.price}
                                    </p>
                                </div>
                                <div class="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                    <div class="w-full">
                                        <button class="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Delete
                                        </button>
                                    </div>
                                    <div class="w-full">
                                        <button class="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
