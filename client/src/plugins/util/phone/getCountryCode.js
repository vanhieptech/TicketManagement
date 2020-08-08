import {
    parsePhoneNumberFromString
} from "libphonenumber-js"

export default function (phone) {
    try {
        const phoneNumber = parsePhoneNumberFromString("+" + phone)
        return phoneNumber.countryCallingCode
    } catch (error) {
        // Not a phone number, non-existent country, etc.
    }
}