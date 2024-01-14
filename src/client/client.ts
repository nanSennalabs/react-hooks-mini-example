import { toast } from 'react-toastify'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { ProductClientActions } from '@client/collections/ProductClientActions'

import type { AuthFunctionListenerType } from './interfaces'
import { AuthenClientActions } from './collections/AuthenClientActions'
import { queryClient } from './init'

function injectAuthorizationToken(
	headers: Record<string, unknown>,
	token: string
) {
	return { ...headers, Authorization: `Bearer ${token}` }
}

export class Client {
	isRefreshingAccessToken = false

	authStateListener = [] as AuthFunctionListenerType

	retryRequestTasks = [] as AuthFunctionListenerType

	readonly auth: AuthenClientActions

	readonly product: ProductClientActions

	constructor(private readonly client: AxiosInstance) {
		this.setupClient()
		this.authStateListener.push(this.handleProfileInvalidation.bind(this))

		this.auth = new AuthenClientActions(this.client, this.authStateListener)
		this.product = new ProductClientActions(this.client)
	}

	onAuthStateChange(listener: () => void) {
		this.authStateListener.push(listener)

		return () => this.authStateListener.filter(l => listener === l)
	}

	setupClient() {
		this.client.interceptors.request.use(config => {
			if (this.auth.accessToken != null) {
				return this.configWithAuthorization(config, this.auth.accessToken)
			}

			return config
		})

		this.client.interceptors.response.use(
			response => response,
			async (error: AxiosError) => {
				if (!this.isAccessTokenExpired(error)) {
					return Promise
						.reject
						// plainToClass(ErrorMessage, error.response?.data)
						()
				}
				// DESC: if token expired, logout user.
				toast.error('เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง')
				await this.auth.logout()
				await this.handleProfileInvalidation()

				if (!this.isRefreshingAccessToken) {
					this.isRefreshingAccessToken = true
					// this.auth
					//   .refreshAccessToken()
					//   .then(
					//     this.handleRefreshAccessTokenSuccess.bind(this),
					//     this.handleRefreshAccessTokenFail.bind(this)
					//   )
				}

				// return Promise.reject(plainToClass(ErrorMessage, error.response?.data))
			}
		)
	}

	configWithAuthorization(config: AxiosRequestConfig, token: string) {
		const { headers = {} } = config

		if (headers.Authorization) {
			return config
		}

		return {
			...config,
			headers: injectAuthorizationToken(headers, token)
		}
	}

	retryRequestQueues(accessTokenOrError: AxiosError | string) {
		this.retryRequestTasks.forEach(queue => {
			queue(String(accessTokenOrError))
		})

		this.retryRequestTasks = []
	}

	handleRefreshAccessTokenSuccess() {
		this.isRefreshingAccessToken = false
		// this.retryRequestQueues(this.auth.accessToken!)
	}

	handleRefreshAccessTokenFail(error: AxiosError) {
		this.isRefreshingAccessToken = false
		this.retryRequestQueues(error)
	}

	isAccessTokenExpired(error: AxiosError) {
		return (
			error.config.url !== `/sessions` &&
			error.config.url !== `/refresh_token` &&
			error.response &&
			error.response.status === 401
		)
	}

	async handleProfileInvalidation() {
		await queryClient.invalidateQueries('user-profile')
	}
}
