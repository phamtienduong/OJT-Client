import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder, MdSearch } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Transition,
  Menu,
} from "@headlessui/react";
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
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Translate from "./Translate.jsx";
import ScrollTop from "./ScrollTop";
import publicAxios from "../config/publicAxios";
import { useDispatch, useSelector } from "react-redux";
import { setReload, setSearchKey } from "../redux/reducer/productReducer.js"
import { useTranslation } from "react-i18next";
import { RouterLink } from "./custom/RouterLink.jsx";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ isLogin, setIsLogin, setIsLoad, handleChangeLanguage, language }) {
  const path = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const cart = useSelector((state) => {
    return state.cartReducer.cart
  })
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("user_login")) || {}
  );
  const { t } = useTranslation();
  const handleLogout = () => {
    localStorage.clear();
    setUserLogin({});
    setIsLogin(false);
    window.location.href = "/login";
  };
  const getCategories = async () => {
    const res = await publicAxios.get("/api/v1/category/get-list");
    setCategory(res.data);
  }
  useEffect(() => {
    // dispatch(action("setUserLogin"));
    setUserLogin(JSON.parse(localStorage.getItem("user_login")));
    getCategories();
  }, [isLogin]);

  const categories = category.map((item) => (
    { name: item.category_name, href: "#", id: item.category_id }
  ))
  const handleClickCategory = (id) => {
    // localStorage.setItem("categoryId", JSON.stringify(id));
    setIsLoad((prev) => !prev);
    navigate(`category/${id}`);
  };
  const theLastName = (name) => {
    var arr = name.split("");
    if (arr.includes(" ")) {
      arr = name.split(" ");
      return arr[arr.length - 1];
    }
    return name;
  };

  const handleChangeKeyword = (word) => {
    setKeyword(word);
  }

  const handleSearch = () => {
    if (path.pathname == "/products") {
      dispatch(setReload(true));
    }
    dispatch(setSearchKey(keyword));
    navigate(`/products`);
  }
  return (
    <header className="bg-white backGroundCo sticky top-0 z-50">
      <Translate handleChangeLanguage={handleChangeLanguage} language={language}></Translate>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only"></span>
            <RouterLink to="/home">
              {" "}
              <img
                className="h-15 w-auto"
                src="https://cdn.cookielaw.org/logos/43e4447f-bb50-4761-be9f-59f99ad594aa/018e6750-2208-703d-8b42-b7d949413fa0/8b63062d-7457-4af4-8b39-40b6f77d482b/CORSAIRLogo2020_horiz_K.png"
                alt=""
                style={{ width: 70, height: 50 }}
              />
            </RouterLink>
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
        <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center truncate">
          <RouterLink
            to="/home"
            className="text-m font-bold leading-6 text-black-800 mb-1"
          >
            {t("HOME")}
          </RouterLink>

          <RouterLink
            to="/contact"
            className="text-m font-bold leading-6 text-black-800 mb-1"
          >
            {t("CONTACT")}
          </RouterLink>
          <RouterLink
            to="/about"
            className="text-m font-bold leading-6 text-black-800 mb-1"
          >
            {t("ABOUT")}
          </RouterLink>
          <Popover.Group className="hidden lg:flex lg:gap-x-12  items-center">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-m font-bold leading-6 text-black-800 mb-1">
                {t("PRODUCT")}
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

                        <div className="flex-auto"
                          onClick={() => handleClickCategory(item.id)}
                        >
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
              className="pl-8 pr-3 py-1 rounded-lg border border-gray-300 text-s focus:outline-none focus:border-blue-500"
              onChange={e => handleChangeKeyword(e.target.value)}
              value={keyword}
            />
            <a
              className="absolute inset-y-0 right-0 flex pr-3 items-center"
              style={{ fontSize: "22px" }}
            >
              <MdSearch onClick={() => handleSearch()} />
            </a>
          </div>
        </Popover.Group>

        <div className="hidden lg:flex lg:gap-x-12 items-center ml-5">
          <RouterLink
            to="/favor"
            className="flex font-normal leading-6 text-black-800 mb-1"
            style={{ fontSize: "25px" }}
          >
            <MdFavoriteBorder />
          </RouterLink>
          <RouterLink
            to="/cart"
            className="flex font-normal leading-6 text-black-800 mb-1"
            style={{ fontSize: "25px" }}
          >
            <div className="flex">
              <div><AiOutlineShoppingCart /></div>
              <div className="text-lg font-semibold leading-6 text-gray-900">
                {cart?.length}
              </div>
            </div>
          </RouterLink>
          <RouterLink
            href="#"
            className=" text-lg font-semibold leading-6 text-gray-900"
          >
            <Menu as="div" className=" ">
              <div>
                {userLogin && userLogin.user_id ? (
                  <Menu.Button className="w-max relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <span style={{ backgroundColor: "white" }}>
                      Chào, {theLastName(userLogin.user_name)}
                    </span>
                  </Menu.Button>
                ) : (
                  <span
                    className="text-2xl 
                  "
                    style={{ backgroundColor: "white" }}
                    onClick={() => handleLogout()}
                  >
                    <AiOutlineUser />
                  </span>
                )}
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <RouterLink
                        to="/account"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </RouterLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <RouterLink
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </RouterLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        // to="/login"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={handleLogout}
                      >
                        Sign out
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>{" "}
          </RouterLink>
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
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
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
                <RouterLink
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </RouterLink>
                <RouterLink
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </RouterLink>

                <RouterLink
                  to="/favor"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Wishlist
                </RouterLink>
                <RouterLink
                  to="/cart"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Cart
                </RouterLink>
                <RouterLink
                  to="/account"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Account
                </RouterLink>
              </div>
              <div className="py-6">
                <RouterLink
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </RouterLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <hr className="w-full" />
    </header>
  );
}
