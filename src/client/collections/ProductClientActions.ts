import type { AxiosInstance, AxiosResponse } from 'axios'
import { plainToInstance } from 'class-transformer'
import Product from '@models/Product/product'

export class ProductClientActions {
	constructor(private readonly client: AxiosInstance) {}

	async getProducts(): Promise<Product[]> {
		// const response = await this.client.get('/users/getStaffUser', {
		// 	params: query
		// })

		const response: AxiosResponse = await new Promise(resolve => {
			setTimeout(() => {
				resolve({
					headers: {},
					config: {},
					request: {},
					status: 200,
					statusText: '',
					data: [
						{
							id: 1,
							name: 'Ford Best seller 1',
							price: '119'
						},
						{
							id: 2,
							name: 'Ford Best seller 2',
							price: '2990'
						},

						{
							id: 3,
							name: 'Ford Best seller 3',
							price: '899'
						}
					]
				})
			}, 3000)
		})

		return plainToInstance(Product, response.data as Record<string, any>[])
	}
}
