import axios from "axios";
import { baseURL } from "./config";
import store from "../store/index.js"
// import actionCreators from "../store/actionCreators/accounts.js";
import { parseError } from "./helpers";
import { message } from "antd";
// create an axios instance
const service = axios.create({
	baseURL: baseURL,
	timeout: 50000,
	headers: {
		"content-type": "application/json;",
	},
	//withCredentials: true, // default
});

// request interceptor
service.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem("access_token");
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		// Do something with request error
		console.log(error); // for debug
		Promise.reject(error);
	}
);

// respone interceptor
service.interceptors.response.use(
	(response) => {
		// let alreadyHandledUrl = [
		// 	`/v1/accounts/reset-password`,
		// 	`/v1/service-providers/information`,
		// 	`/v1/accounts/beneficiary/accept-invitation`,
		// 	`/v1/accounts/profile-pictures/`,
		// 	`/v1/accounts/confirm-forgot-password`,
		// 	`/v1/accounts/forgot-password`,
		// 	`/v1/accounts/beneficiary/accept-invitation`,
		// 	`/v1/campaigns/report/`,
		// 	`/v1/accounts/confirm-email`,
		// 	`/v1/accounts/resend-verification-email`,
		// 	`/v1/beneficiaries/complete/`,
		// 	`/v1/service-providers/complete/`,
		// 	`/v1/service-providers/accept/`,	
		// 	`/v1/feedback`,
		// 	`/v1/accounts/refresh-token`,
		// ]

		// if (!alreadyHandledUrl.includes(response.config.url) && response.config.method!=='get'){
		// 	message.success({
		// 		key: 'msgKey',
		// 		content: "Success",
		// 		duration: 1,
		// 		className: "custom-class",
		// 		onClick:(() => message.destroy('msgKey'))
		// 	})
		// }
		return response.data;
	},
	async (err) => {
		parseError(err);
		const originalConfig = err.config;
		if (originalConfig.url !== "/auth/login" && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const rs = await service.post("/v1/accounts/refresh-token", {
						refreshToken: sessionStorage.getItem("refresh_token"),
					});

					const { accessToken, refreshToken } = rs;
					sessionStorage.setItem("access_token", accessToken);
					sessionStorage.setItem("refresh_token", refreshToken);
					// store.dispatch(actionCreators.UpdateUserToken(rs));
					return service(originalConfig);
				} catch (_error) {
					// store.dispatch(actionCreators.Logout());
					window.location.href = "/auth/login";
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export default service;
