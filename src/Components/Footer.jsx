import { AiOutlineSend } from "react-icons/ai";
import { Typography } from "@material-tailwind/react";
import Qr from "../Images/frame.png";
import Gg from "../Images/google2.png";
import ios from "../Images/ios2.png";
import "./Footer.scss";
const SITEMAP = [
    {
        title: "Exclusive",
        links: [
            "Subcribe",
            "Get 10% off your first order",

            <div className="123">
                <input
                    className="custom-input"
                    style={{ width: "140px" }}
                    type="text"
                    placeholder="Enter your email"
                />
                <button
                    style={{
                        width: "50px",
                        height: "30px",
                        borderRadius: "10px",
                        color: "black",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px",
                        transition: "background-color 0.3s ease",
                        marginBottom: "10px",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "black";
                    }}
                >
                    <AiOutlineSend />
                </button>
            </div>,
        ],
    },
    {
        title: "Support",
        links: ["Thanh Xuan - Ha Noi", "RAHanoi@gmail.com", "0987654321"],
    },
    {
        title: "Account",
        links: ["My Account", "Login/Register", "Cart", "Wishlist", "Shop"],
    },
    {
        title: "Quick Link",
        links: ["Provacy Policy", "Terms of Use", "FAQ", "Contact"],
    },
];

const currentYear = new Date().getFullYear();

export function Footer() {
    return (
        <footer className="relative w-full bg-black">
            <div className="mx-auto w-full max-w-7xl px-8 mr-5">
                <div
                    className="mx-auto grid w-full grid-cols-2  py-12 md:grid-cols-4 lg:grid-cols-6"
                    style={{ marginTop: "100px" }}
                >
                    {SITEMAP.map(({ title, links }, key) => (
                        <div key={key} className="w-2/3">
                            <Typography
                                variant="small"
                                color="white"
                                className="mb-4 font-bold uppercase opacity-50"
                            >
                                {title}
                            </Typography>
                            <ul className="space-y-1">
                                {links.map((link, key) => (
                                    <Typography
                                        key={key}
                                        as="li"
                                        color="white"
                                        className="font-normal"
                                    >
                                        <a
                                            href="#"
                                            className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                                        >
                                            {link}
                                        </a>
                                    </Typography>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                opacity: "0.5",
                            }}
                        >
                            Dowload
                        </div>
                        <div>
                            <div style={{ marginTop: "20px" }}>
                                <img
                                    style={{
                                        width: "60%",
                                        border: "1px solid white",
                                    }}
                                    key="qr"
                                    src={Qr}
                                    alt="QR Code"
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                style={{
                                    width: "50%",
                                    height: "10%",
                                    marginTop: "5px",
                                    marginRight: "5px",
                                    border: "1px solid white",
                                }}
                                key="gg"
                                src={Gg}
                                alt="Google"
                            />
                            <img
                                style={{
                                    width: "54%",
                                    height: "20%",
                                    marginTop: "5px",
                                    border: "1px solid white",
                                }}
                                key="ios"
                                src={ios}
                                alt="Ios"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
