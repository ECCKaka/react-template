// useful functions which are not components
import moment from "moment";
import { message } from "antd";
export function isValidEmail(email) {
	return RegExp(
		'^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
			'(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
			"|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
	).test(email);
}

export function validatePassword(value, confirmation) {
	const checkLength = value.length >= 8 && value.length <= 255;
	const checkLowerCase = /[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value);
	const checkUpperCase = /[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value);
	const checkNumber = /[0-8]/.test(value);
	const checkRepeat = /(.)\1{1}/.test(value);
	const checkMatch = value === confirmation;

	if (!checkLength) {
		return "Password should be between 8 and 255 characters long";
	}

	if (!checkLowerCase) {
		return "The password should contain at least one lowercase letter";
	}

	if (!checkUpperCase) {
		return "The password should contain at least one uppercase letter";
	}

	if (!checkNumber) {
		return "The password should contain at least one digit";
	}

	if (checkRepeat) {
		return "The password cannot contain two repeating characters one after another";
	}

	if (!checkMatch && confirmation.length > 0) {
		return "The password and confirmation do not match";
	}

	return true;
}

export function formatPhone(phone) {
	if (!phone) return "";

	var ex;
	var ph = phone;
	var exidx = ph.search(/[e|x]/);

	if (exidx >= 0) {
		ex = ph.substring(exidx).replace(/\D/g, "");
		ph = ph.substring(0, exidx);
	}

	ph = ph.replace(/\D/g, "");

	if (ph.indexOf("1") === 0) ph = ph.substring(1);

	if (ph.length !== 10) return phone;

	ph = `(${ph.substring(0, 3)}) ${ph.substring(3, 6)}-${ph.substring(6)}`;

	if (ex) ph += " x" + ex;

	return ph;
}

export function toTitleCase(str) {
	str = str.toLowerCase();
	str = str.split(" ");

	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return str.join(" ");
}

export function formatISODate(date) {
	if (!date) {
		return "";
	}

	return `${moment(date).format("YYYY-MM-DDTHH:mm:ss.000")}Z`;
}

export function formatISODateWithoutTime(date) {
	if (!date) {
		return "";
	}

	return `${moment(date).format("YYYY-MM-DD")}T00:00:00.000Z`;
}

export function formatDateOnly(date) {
	if (!date) {
		return "";
	}

	return moment(date).format("YYYY-MM-DD");
}

function errorMessage(content) {
	message.error({
		key: content,
		content: content,
		duration: 2,
		className: "custom-class",
		onClick: () => message.destroy(content),
	});
}

export function parseError(err) {
	let error = err.response;
	if (error.data?.message) {
		if (error.data?.message === "EmailPasswordDoNotMatch") {
			errorMessage("Email password do not match");
			return "Email password do not match";
		} else if (error.data?.message === "You cannot login into this portal.") {
			errorMessage(
				"You cannot log into this portal. Please make sure that you are using the correct email and password."
			);
		}  else if (error.data?.message === "The user account has been disabled and can no longer be accessed.") {
			errorMessage(
				"Your account has been disabled. Please contact the Administrator."
			);
			return "Your account has been disabled. Please contact the Administrator."
		} else if (error.data?.message === "File.Size.Limit") {
			errorMessage(
				"This file exceeds the accepted size limit."
			);
			return "This file exceeds the accepted size limit."
		} else if (error.data?.message === "The instance of entity type 'CampaignServiceProvider' cannot be tracked because another instance with the same key value for {'CampaignId', 'UserId'} is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached. Consider using 'DbContextOptionsBuilder.EnableSensitiveDataLogging' to see the conflicting key values.") {
			errorMessage(
				"You have already offered this Campaign to this Provider."
			);
			return "This file exceeds the accepted size limit."
		} else if (error.data?.message?.includes("User.InvalidUser")) {
			return error.data.message;
		} else if (error.data?.message === "Object reference not set to an instance of an object."){
			return error.data.message;
		}
		errorMessage(error.data.message);
		return error.data.message;
	} else if (error.data?.status === 429) {
		errorMessage(
			"Sorry, you are trying to perform the same action too often. Please wait some time and then try again."
		);
		return "Sorry, you are trying to perform the same action too often. Please wait some time and then try again.";
	} else if (error.data?.errors) {
		let errors = error.data.errors;
		if (Object.keys(errors).length > 0) {
			let errorMsg = "";
			Object.keys(errors).forEach((e) => {
				if (
					errors[e]?.[0] ===
					"The field Password must be a string with a minimum length of 8 and a maximum length of 50."
				) {
					errorMessage(
						"The password must contain 8 characters minimum, and at least 1 Capital letter, 1 number, and 1 special character."
					);
					errorMsg +=
						"The password must contain 8 characters minimum, and at least 1 Capital letter, 1 number, and 1 special character.";
				} else {
					errorMessage(`${errors[e]}`);
					errorMsg += `${errors[e]}`;
				}
			});
			return errorMsg;
		} else {
			errorMessage(
				"Sorry, an unexpected error occurred. Please try again and contact us if the issue still persists."
			);
			return "Sorry, an unexpected error occurred. Please try again and contact us if the issue still persists.";
		}
	} else if (err.request) {
		// message.error(
		// 	"Sorry, we are unable to connect to the Quilt due to network issues. Please try again or contact our support team if the issue still persist."
		// );
		return "Sorry, we are unable to connect to the Quilt due to network issues. Please try again or contact our support team if the issue still persist.";
	} else {
		message.error(
			"Sorry, an unexpected error occurred. Please try again and contact us if the issue still persists."
		);
		return "Sorry, an unexpected error occurred. Please try again and contact us if the issue still persists.";
	}
}

export function getDatesBetween(startDate, endDate) {
	const dates = [];

	let currentDate = new Date(
		startDate.getFullYear(),
		startDate.getMonth(),
		startDate.getDate()
	);

	while (currentDate <= endDate) {
		dates.push(currentDate);

		currentDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() + 1
		);
	}

	return dates;
}
