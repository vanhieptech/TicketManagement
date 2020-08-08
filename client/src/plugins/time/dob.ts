import dayjs from 'dayjs'

function dob(date) {
	if (date) {
		let returnText = ""
		if (dayjs().diff(dayjs(date), "year", true) > 3) {
			// format by years
			returnText += dayjs().diff(dayjs(date), "year") + " tuổi";
		} else if (dayjs().diff(dayjs(date), "month", true) > 1) {
			// format by months
			returnText += dayjs().diff(dayjs(date), "month") + " tháng tuổi";
		} else {
			// format by days
			returnText += dayjs().diff(dayjs(date), "day") + " ngày tuổi";
		}

		// append dob to return text
		returnText += ` (${dayjs(date).format("DD-MM-YYYY")})`
		return returnText
	} else return 'none';
}

export default dob
