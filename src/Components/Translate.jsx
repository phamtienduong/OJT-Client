import React, { useState } from "react";
import { Select } from "antd";
import "./Translate.scss";
import { useTranslation } from "react-i18next";

export default function Translate({ handleChangeLanguage, language }) {
    const { i18n } = useTranslation(['home']);
    const { t } = useTranslation();
    const handleChange = (lang) => {
        i18n.changeLanguage(lang);
        handleChangeLanguage(lang);
        window.location.reload();
    }
    return (
        <div className="my-translate">
            <div className="my-translate__text">
                {t("SALE.SALE_HEADER", {product: t("PRODUCT")})}
            </div>
            <div
                className="my-translate__button flex items-center cursor-pointer"
            >
                <Select
                    defaultValue="en"
                    value={language}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'en',
                            label: `${t("ENG")}`,
                        },
                        {
                            value: 'vi',
                            label: `${t("VIE")}`,
                        },
                    ]}
                />
            </div>
        </div>
    );
}
