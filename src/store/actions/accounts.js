import * as actionTypes from "../action-types";
// import { login } from "../../api/accounts";
import { message } from "antd";
// import axios from 'axios';
import axios from "@/utils/request.js";

let token = sessionStorage.getItem("access_token");

const multipartHeader = {
	headers: {
		Authorization: `Bearer ${token}`,
		"content-type": "multipart/form-data",
	},
};

// export function getLogin(data) {
	// return (dispatch) =>
	// 	new Promise(async (resolve, reject) => {
	// 		try {
	// 			dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
	// 			let res = await login(data);
	// 			sessionStorage.setItem("access_token", res.accessToken);
	// 			sessionStorage.setItem("refresh_token", res.refreshToken);
	// 			dispatch({ type: actionTypes.SET_USER, payload: res });
	// 			resolve("success");
	// 		} catch (error) {
	// 			console.log("error", error);

	// 			let status = error.response.status;
	// 			if (status === 426) {
	// 				dispatch({
	// 					type: actionTypes.EMAIL_CONFIRMATION,
	// 					payload: error.response.data,
	// 					error: true,
	// 				});
	// 				resolve("test");
	// 			}
	// 		} finally {
	// 			dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
	// 		}
	// 	});
// }

// export function GetBeneficiaryInfo() {
	// return function (dispatch) {
	// 	(async () => {
	// 		try {
	// 			dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
	// 			let res = await axios.get(`/v1/beneficiaries/information`);
	// 			dispatch({ type: actionTypes.SET_USER, payload: res });
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
	// 		}
	// 	})();
	// };
// }
