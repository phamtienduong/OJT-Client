import { HiOutlineSwitchHorizontal } from "react-icons/hi"; 
import { BiChevronDown } from "react-icons/bi"; 
import React, { useState } from "react";
import "./Translate.scss";

export default function Translate() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="my-translate">
            <div className="my-translate__text">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF
                50%!
            </div>
            <div
                className="my-translate__button flex items-center cursor-pointer"
                onClick={toggleDropdown}
            >
               {isOpen ? "English " : "Vietnamese "} <br />
                <HiOutlineSwitchHorizontal />
               
            </div>
        </div>
    );
}
