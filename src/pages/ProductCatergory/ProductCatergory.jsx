/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";

import publicAxios from "../../config/publicAxios";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../helper/formatMoney";
import { Rate, Select } from "antd";

const sortOptions = [
    { label: "Best Rating", value: 1 },
    { label: "Price: Low to High", value: 2 },
    { label: "Price: High to Low", value: 3 },
];

const filters = [
    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White", checked: false },
            { value: "beige", label: "Beige", checked: false },
            { value: "blue", label: "Blue", checked: true },
            { value: "brown", label: "Brown", checked: false },
            { value: "green", label: "Green", checked: false },
            { value: "purple", label: "Purple", checked: false },
        ],
    },
    {
        id: "category",
        name: "Category",
        options: [
            { value: "new-arrivals", label: "New Arrivals", checked: false },
            { value: "sale", label: "Sale", checked: false },
            { value: "travel", label: "Travel", checked: true },
            { value: "organization", label: "Organization", checked: false },
            { value: "accessories", label: "Accessories", checked: false },
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "2l", label: "2L", checked: false },
            { value: "6l", label: "6L", checked: false },
            { value: "12l", label: "12L", checked: false },
            { value: "18l", label: "18L", checked: false },
            { value: "20l", label: "20L", checked: false },
            { value: "40l", label: "40L", checked: true },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductCatergory({ isLoad }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const { id } = useParams()
    // console.log("idCate", id);
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([]);
    const [avgStar, setAvgStar] = useState(1);


    // dùng để chuyển trang
    const navigate = useNavigate()
    // số trang
    const [productTotal, setProductTotal] = useState(0)
    // trang hiện tại
    const [currentPage, setCurrentPage] = useState(1)
    // số sp trong một trang
    const [pageSize, setPageSize] = useState(6)

    // vẽ danh sách các trang
    const renderPage = () => {
        // mảng lưu kết quả giao diện dùng để vẽ
        const page = []
        // lặp qua số trang để vẽ
        for (let i = 0; i < productTotal; i++) {
            page.push(
                <a
                    key={i}
                    href="#"
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${(i + 1) == currentPage ? "bg-indigo-600" : "white"}
              ${(i + 1) == currentPage ? "text-white" : "text-black"}
              `}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </a>
            )
        }
        return page
    }
    // đánh dấu trang hiện tại
    const handleUpDownPage = (status) => {
        // status quyết định lên trang hay lùi trang
        switch (status) {
            // 0 là lùi
            case 0:
                if (currentPage == 1) {
                    setCurrentPage(productTotal)
                } else {
                    setCurrentPage(currentPage - 1)
                }
                break
            // 1 là tăng
            case 1:
                if (currentPage == productTotal) {
                    setCurrentPage(1)
                } else {
                    setCurrentPage(currentPage + 1)
                }
                break
        }
    }
    const getCategories = async () => {
        const res = await publicAxios.get("/api/v1/category/get-list");
        //   console.log(res.data);
        setCategory(res.data);
    }
    const subCategories = category.map((item) => (
        { name: item.category_name, href: `/category/${item.category_id}` }
    ))


    useEffect(() => {
        const start = (currentPage - 1) * pageSize
        let end = (start) + pageSize
        const getProducts = async () => {
            const res = await publicAxios.get(`/api/v1/products/category/${id}`)
            // console.log(res.data);
            const data = res.data
            if (end > data.length) {
                end = data.length
            }
            const newProduct = data.slice(start, end)

            for (let i = 0; i < newProduct.length; i++) {
                const res = await publicAxios.get(`/api/v1/review/avg-start/${newProduct[i].product_id}`)
                const data = res.data.data['AVG(rating)']
                newProduct[i]['avgStar'] = Math.round(data);
            }
            console.log(newProduct);


            setProductTotal(Math.ceil(data.length / pageSize))
            setProducts(newProduct)

        }
        getProducts()
        getCategories();
        getAvgStar();

    }, [currentPage, pageSize, isLoad])
    const getAvgStar = async () => {
        const result = await publicAxios.get(`/api/v1/review/avg-start/${products.product_id}`)
        const data = result.data.data['AVG(rating)']
        // console.log("==> ::: ", Math.round(data));
        setAvgStar(Math.round(data));
    }


    const handleClickProduct = (id) => {
        // console.log(id);
        // localStorage.setItem("idProductDetail", id)
        navigate(`/product_detail/${id}`)
    }

    const handleChangeSort = (value) => {
        console.log(value);
        switch (value) {
            case 1:
                const newProductsC = [...products.sort((a, b) => b.avgStar - a.avgStar)]
                setProducts(newProductsC)
                break;
            case 2:
                const newProductsA = [...products.sort((a, b) => +a.price - +b.price)]
                setProducts(newProductsA)
                break;
            case 3:
                const newProductsB = [...products.sort((a, b) => +b.price - +a.price)]
                setProducts(newProductsB)
                break;
        }
    }


    return (
        <>
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul
                                            role="list"
                                            className="px-2 py-3 font-medium text-gray-900"
                                        >
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a
                                                        href={category.href}
                                                        className="block px-2 py-3"
                                                    >
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        section.name
                                                                    }
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map(
                                                                    (
                                                                        option,
                                                                        optionIdx
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                option.value
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
                                                                                }
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            New Arrivals
                        </h1>

                        <div className="flex items-center">

                            <Select
                                defaultValue={sortOptions[0].value}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChangeSort}
                                options={sortOptions.map((item) => ({
                                    label: item.label,
                                    value: item.value,
                                }))}
                            />

                            <button
                                type="button"
                                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                                >
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map(
                                                            (
                                                                option,
                                                                optionIdx
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={
                                                                            option.value
                                                                        }
                                                                        type="checkbox"
                                                                        defaultChecked={
                                                                            option.checked
                                                                        }
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                                    {products.map((product) => (
                                        <a
                                            key={product.product_id}
                                            onClick={() => handleClickProduct(product.product_id)}
                                            href={product.href}
                                            className="group border p-0 w-full m-auto"
                                        >
                                            <div className="relative">
                                                {product.discount == 0 ? <></> : (
                                                    <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center">
                                                        <span className="text-xs sm:text-sm md:text-base">SALE {product.discount * 100}%</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img
                                                    src={product.default_image}
                                                    alt={product.imageAlt}
                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700 text-center">
                                                {product.product_name}
                                            </h3>
                                            <div className="flex justify-center mt-1 text-lg font-medium text-gray-900 text-center">
                                                {product.discount > 0 ? (
                                                    <>
                                                        <p className="text-lg font-medium text-gray-900 line-through">
                                                            {formatCurrency(+product.price)}
                                                        </p>
                                                        <p className="text-lg ml-2 font-medium text-red-600">
                                                            {formatCurrency(product.price * (1 - product.discount))}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="text-lg font-medium text-gray-900">
                                                        {formatCurrency(+product.price)}
                                                    </p>
                                                )}
                                            </div>

                                            <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                                                <Rate disabled value={product.avgStar} className='text-sm' />
                                            </p>
                                        </a>
                                    ))}
                                </div>
                                <div >
                                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                        <div className="flex flex-1 justify-between sm:hidden">
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Previous
                                            </a>
                                            <a
                                                href="#"
                                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Next
                                            </a>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                                            <div>

                                            </div>
                                            <div>
                                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                    <a
                                                        onClick={() => handleUpDownPage(0)}
                                                        href="#"
                                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                    </a>
                                                    {renderPage()}
                                                    <a
                                                        onClick={() => handleUpDownPage(1)}
                                                        href="#"
                                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                    </a>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
