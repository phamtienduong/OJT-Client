import React, { useEffect, useState } from 'react'
import Scroll from "../Images/9597330.png";
export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;

        // Hiển thị nút cuộn lên đầu trang khi scrollTop vượt quá một ngưỡng nhất định (ví dụ: 200px)
        setIsVisible(scrollTop < 200);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Để có hiệu ứng cuộn mượt
        });
    };

    // Gắn sự kiện lắng nghe sự kiện scroll của cửa sổ
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
      <img
          src={Scroll}
          //   className=" "
          alt=""
          className={`fixed bottom-16 right-10 scroll-to-top-button w-1/12 h-1/12 xl:w-[60px] lg:w-[50px] sm:w-[50px] ${
              isVisible ? "visible" : ""
          } `}
          onClick={scrollToTop}
      />
  );
}
