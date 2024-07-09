import axios from 'axios'

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

const axiosInstance = axios.create({
	baseURL: '/api',
	headers,
})
axiosInstance.interceptors.request.use(
	async (config) => {
		// config.headers.Authorization = `ya29.a0AXooCgtJyur30ForA3N3dvKuNZO9dGI-wuS5fMD0rzViE7G9JGWEKkmY-I_AjXON2rr4SHbkfOpvAmPXDQMy30gXynEJ6dj0MI4GOSltS_rloVgAskM_8b7-JlLw8tRtxTxmCSRj0Q4RH6ljU1hEROpLlDZRJpC9a2uYO_oYAWJcwBuG6qcaCgYKAVcSARASFQHGX2MiBkfDKWcO6zhxMzZ3oKz6JA0186`

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) =>
		new Promise((resolve) => {
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
			return new Promise((reject) => {
				reject(error)
			})
		}
		console.log(error.response.status)
		if (error.response.status === 401 || error.response.status === 403) {
			return new Promise(() => {
			})
			// } else if (error.response.status === 400 || error.response.status === 500) {
			//   return new Promise((resolve, reject) => {
			//     reject(error.response.data);
			//   });
		} else {
			//防止10秒跳提示 系統服務關閉中，請聯絡系統商。
			if (
				error.response.status === 502) {
				return new Promise((reject) => {
					reject(error)
				})
			}

			if (error.response.status === 502) {
				return new Promise((reject) => {
					reject(error)
				})
			}

			return new Promise((reject) => {
				reject(error.response.data || error)
			})
		}
	}
)

export default axiosInstance
