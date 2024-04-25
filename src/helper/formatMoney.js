export const formatCurrency = (price) => {
  const formattedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  }).replace("₫", "đ"); // Thay thế ký hiệu tiền tệ từ "₫" sang "đ"
  return formattedPrice;
};
