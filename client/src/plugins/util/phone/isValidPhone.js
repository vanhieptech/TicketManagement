import {
    parsePhoneNumberFromString
} from "libphonenumber-js"

export default function (phone) {
    try {
        const phoneParsed = parsePhoneNumberFromString("+" + phone)
        return phoneParsed.isValid()
    } catch (error) {
        return false
    }
}