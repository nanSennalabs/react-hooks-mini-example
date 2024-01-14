import type Product from '@models/Product/product'

export interface ProductsListType {
	products: Product[] | undefined
	isLoading: boolean
}
