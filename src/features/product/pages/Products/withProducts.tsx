import type { ProductsListType } from '@features/product/pages/Products/product.interface'
import { useQuery } from 'react-query'
import { useAppClient } from '@client/ApiContext'

export function WithProducts(
	Component: React.FunctionComponent<ProductsListType>
) {
	function HOC() {
		const appClient = useAppClient()
		const { data, isLoading } = useQuery(['products'], () =>
			appClient?.product.getProducts()
		)

		const newProps: ProductsListType = {
			products: data,
			isLoading
		}
		return <Component {...newProps} />
	}
	return HOC
}
