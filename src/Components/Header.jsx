import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder, MdSearch } from "react-icons/md";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    UserIcon,
    ArchiveBoxIcon,
    StarIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import "./Header.scss";

import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Translate from "./Translate";
import { Link } from "react-router-dom";

const products = [
    {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: ChartPieIcon,
    },
    {
        name: "Engagement",
        description: "Speak directly to your customers",
        href: "#",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Security",
        description: "Your customers’ data will be safe and secure",
        href: "#",
        icon: FingerPrintIcon,
    },
    {
        name: "Integrations",
        description: "Connect with third-party tools",
        href: "#",
        icon: SquaresPlusIcon,
    },
    {
        name: "Automations",
        description: "Build strategic funnels that will convert",
        href: "#",
        icon: ArrowPathIcon,
    },
];
const callsToAction = [
    { name: "Watch demo", href: "#", icon: PlayCircleIcon },
    { name: "Contact sales", href: "#", icon: PhoneIcon },
];
const products2 = [
    { name: "My Account", href: "#", icon: UserIcon },
    { name: "My Orders", href: "#", icon: ArchiveBoxIcon },
    { name: "My Reviews", href: "#", icon: StarIcon },
    { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];

const categories = [
    { name: "Mobile", href: "#", icon: UserIcon },
    { name: "Computer", href: "#", icon: ArchiveBoxIcon },
    { name: "Laptop", href: "#", icon: StarIcon },
    { name: "Clothes", href: "#", icon: ArrowLeftOnRectangleIcon },
];
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}



export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white backGroundCo sticky top-0 z-50">
            <Translate></Translate>
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex items-center">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only"></span>
                        <a
                            href="#"
                            style={{
                                color: "black",
                                fontSize: "40px",
                                fontWeight: "bold",
                            }}
                        >
                            Exclusive
                        </a>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
                    <Link
                        to="/"
                        className="text-m font-bold leading-6 text-black-800 mb-1"
                    >
                        Home
                    </Link>

                    <Link
                        to="/contact"
                        className="text-m font-bold leading-6 text-black-800 mb-1"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/about"
                        className="text-m font-bold leading-6 text-black-800 mb-1"
                    >
                        About
                    </Link>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12  items-center">
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-m font-bold leading-6 text-black-800 mb-1">
                                Products
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute -left-10 top-full z-10 mt-3  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-0">
                                        {categories.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-1 hover:bg-gray-50"
                                            >
                                                <div className="flex h-1 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 "
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <a
                                                        href={item.href}
                                                        className="block font-semibold text-gray-900"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search here"
                            className="pl-8 pr-3 py-1 rounded-lg border border-gray-300 text-s focus:outline-none focus:border-blue-500 "
                        />
                        <a
                            href="#"
                            className="absolute inset-y-0 right-0 flex pr-3 items-center"
                            style={{ fontSize: "22px" }}
                        >
                            <MdSearch />
                        </a>
                    </div>
                </Popover.Group>
                <div className="hidden lg:flex lg:gap-x-12 items-center ml-5">
                    <Link
                        to="/favor"
                        className="flex font-normal leading-6 text-black-800 mb-1"
                        style={{ fontSize: "25px" }}
                    >
                        <MdFavoriteBorder />
                    </Link>
                    <Link
                        to="/cart"
                        className="flex font-normal leading-6 text-black-800 mb-1"
                        style={{ fontSize: "25px" }}
                    >
                        <AiOutlineShoppingCart />
                    </Link>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-m font-bold leading-6 text-black-800 mb-1 ml-2">
                                <AiOutlineUser className="h-6 w-6" />
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute -left-10 top-full z-10 mt-3  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-0">
                                        {products2.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-1 hover:bg-gray-50"
                                            >
                                                <div className="flex h-1 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 "
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <a
                                                        href={item.href}
                                                        className="block font-semibold text-gray-900"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>
                </div>
                {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a
                        href="#"
                        className="text-sm font-bold leading-6 text-black-800"
                    >
                        <MdFavoriteBorder />{" "}
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div> */}
                <div></div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Exclusive</span>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Home
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? "rotate-180"
                                                            : "",
                                                        "h-5 w-5 flex-none"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[
                                                    ...products,
                                                    ...callsToAction,
                                                ].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Link
                                    to="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contact
                                </Link>
                                <Link
                                    to="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    About
                                </Link>

                                <Link
                                    to="/favor"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Wishlist
                                </Link>
                                <Link
                                    to="/cart"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Cart
                                </Link>
                                <Link
                                    to="/account"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Account
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            <hr className="w-full" />
        </header>
    );
}