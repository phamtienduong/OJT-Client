// import React, { useState } from "react";
// import { Select } from "antd";
// import "./Translate.scss";
// import { useTranslation } from "react-i18next";

// export default function Translate({ handleChangeLanguage, language }) {
//     const { i18n } = useTranslation(['home']);
//     const handleChange = (lang) => {
//         i18n.changeLanguage(lang);
//         handleChangeLanguage(lang)
//     }
//     return (
//         <div className="my-translate">
//             <div className="my-translate__text">
//                 Summer Sale For All Swim Suits And Free Express Delivery - OFF
//                 50%!
//             </div>
//             <div
//                 className="my-translate__button flex items-center cursor-pointer"
//             >
//                 <Select
//                     defaultValue="en"
//                     value={language}
//                     style={{
//                         width: 120,
//                     }}
//                     onChange={handleChange}
//                     options={[
//                         {
//                             value: 'en',
//                             label: 'English',
//                         },
//                         {
//                             value: 'vi',
//                             label: 'Vietnamese',
//                         },
//                     ]}
//                 />
//             </div>
//         </div>
//     );
// }
