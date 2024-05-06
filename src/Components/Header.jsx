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
} from "@heroicons/react/24/outline";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Translate from "./Translate.jsx";
// import ScrollTop from "./ScrollTop";
import publicAxios from "../config/publicAxios";
import { useDispatch, useSelector } from "react-redux";
import { setReload, setSearchKey } from "../redux/reducer/productReducer.js";
import { useTranslation } from "react-i18next";
import { RouterLink } from "./custom/RouterLink.jsx";
import { customNavigate } from "../app/hook.js";
import { usePopper } from "react-popper";
import { notification } from "antd";
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

export default function Header({
  isLogin,
  setIsLogin,
  setIsLoad,
  handleChangeLanguage,
  language,
}) {
  const cart = useSelector((state) => {
    return state.cartReducer.cart;
  });
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("user_login")) || {}
  );
  const path = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  const handleLogout = () => {
    localStorage.removeItem("user_login");
    localStorage.removeItem("token");
    setUserLogin({});
    setIsLogin(false);
    customNavigate(navigate, "/login");
  };
  const getCategories = async () => {
    const res = await publicAxios.get("/api/v1/category/get-list");
    setCategory(res.data);
  };
  useEffect(() => {
    // dispatch(action("setUserLogin"));
    setUserLogin(JSON.parse(localStorage.getItem("user_login")));
    getCategories();
  }, [isLogin]);

  const categories = category?.map((item) => ({
    name: item.category_name,
    href: "#",
    id: item.category_id,
  }));
  const handleClickCategory = (id) => {
    setIsLoad((prev) => !prev);
    customNavigate(navigate, `/category/${id}`);
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
  };

  const handleSearch = () => {
    if (path.pathname == `/${language}/products`) {
      dispatch(setReload(true));
    }
    dispatch(setSearchKey(keyword));
    customNavigate(navigate, "/products");
  };
  const gotoCart = () => {
    if (!userLogin) return notification.error({
      message: 'You must login to access cart'
    })
    return customNavigate(navigate, "/cart");
  }
  return (
    <header className="bg-white backGroundCo sticky top-0 z-50">
      <Translate
        handleChangeLanguage={handleChangeLanguage}
        language={language}
      ></Translate>
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
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  ref={setReferenceElement}
                  className="flex items-center gap-x-1 text-m font-bold leading-6 text-black-800 mb-1 outline-none"
                >
                  {t("PRODUCT")}
                  <ChevronDownIcon
                    className={`${open ? "transform rotate-180" : ""
                      } h-5 w-5 flex-none text-gray-400`}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Popover.Panel
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                  className="z-50"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 ">
                    <div className="relative flex gap-6 bg-white p-7 lg:flex-col rounded">
                      {categories.length > 0 &&
                        categories.map((item) => (
                          <div onClick={() => handleClickCategory(item.id)} className="cursor-pointer">
                            <a
                              key={item.id}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                            >
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
          <div className="relative">
            <input
              type="text"
              placeholder={t("SEARCH")}
              className="pl-8 pr-3 py-1 rounded-lg border border-gray-300 text-s focus:outline-none focus:border-blue-500"
              onChange={(e) => handleChangeKeyword(e.target.value)}
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
          <div className="flex cursor-pointer text-2xl">
            <div onClick={() => gotoCart()}>
              <AiOutlineShoppingCart />
            </div>
            <div className="text-lg font-semibold leading-6 text-gray-900" style={{ display: cart.length > 0 ? "inline-block" : 'none' }}>
              {cart?.length}
            </div>
          </div>
          <div
            className=" text-lg font-semibold leading-6 text-gray-900 outline-none"
          >
            <Menu as="div" className=" ">
              <div>
                {userLogin && userLogin.user_id ? (
                  <Menu.Button className="w-max relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span style={{ backgroundColor: "white" }}>
                      {t("HELLO")}, {theLastName(userLogin.user_name)}
                    </span>
                  </Menu.Button>
                ) : (
                  <RouterLink to="/login">
                    <span
                      className="text-2xl 
                  "
                      style={{ backgroundColor: "white" }}
                    >
                      <AiOutlineUser />
                    </span>
                  </RouterLink>
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
                        {t("USER.YOUR_PROFILE", { profile: t("PROFILE") })}
                      </RouterLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <RouterLink
                        to="/bills"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {t("USER.YOUR_BILL", { bill: t("BILL") })}
                      </RouterLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <RouterLink
                        to="/setting"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {t("SETTING")}
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
                        {t("SIGN_OUT")}
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
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
