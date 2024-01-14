import { lazy } from 'react'

const ProductsPage = lazy(async () => import('./pages/Products/Products'))

export const productRoutesPath = {
	productList: {
		path: 'list',
		absolutePath: 'product/list'
	}
}

export const productRoutes = {
	path: 'product',
	children: [{ path: 'list', element: <ProductsPage /> }]
}
