import { formatNumber } from "libphonenumber-js";

export default function(phone, countryCode) {
  countryCode = parseInt(countryCode || 84).toString();
  if (!phone) return null;
  phone = phone.toString().replace(/\D/g, "");
  phone = parseInt(phone).toString();
  if (phone.substring(0, countryCode.length) !== countryCode)
    phone = countryCode + phone;

  // phone formatted
  const phoneFormatted = formatNumber("+" + phone, "International").replace(
    / /g,
    ""
  );
  return String(Number(phoneFormatted));
}
