import axios from 'axios'

let headers = {}

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	headers,
})
axiosInstance.interceptors.request.use(
	async (config) => {
		config.headers.Authorization = `Bearer ${777}`

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) =>
		new Promise((resolve, reject) => {
			console.info(
				`API_${response.config.url}`,
				`${JSON.stringify(response.data)}`
			)
			resolve(response)
		}),
	(error) => {
		console.info(
			'API_ERR',
			`${error.response.config.url}\t${
				error.response.config?.data
			}\nERROR：${JSON.stringify(error.response.data)}`
		)
		if (!error.response) {
			return new Promise((resolve, reject) => {
				reject(error)
			})
		}
		console.log(error.response.status)
		if (error.response.status === 401 || error.response.status === 403) {
			return new Promise((resolve, reject) => {
				reject()
			})
			// } else if (error.response.status === 400 || error.response.status === 500) {
			//   return new Promise((resolve, reject) => {
			//     reject(error.response.data);
			//   });
		} else {
			//防止10秒跳提示 系統服務關閉中，請聯絡系統商。
			if (
				error.response.status === 502) {
				return new Promise((resolve, reject) => {
					reject(error)
				})
			}

			if (error.response.status === 502) {
				return new Promise((resolve, reject) => {
					reject(error)
				})
			}

			return new Promise((resolve, reject) => {
				reject(error.response.data || error)
			})
		}
	}
)

export default axiosInstance
