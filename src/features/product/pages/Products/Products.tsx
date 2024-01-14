import { WithProducts } from '@features/product/pages/Products/withProducts'
import type { ProductsListType } from '@features/product/pages/Products/product.interface'

function Products({ products, isLoading }: ProductsListType) {
	return (
		<div className='p-4'>
			<div className='mb-4 text-2xl font-bold'>Products</div>
			{isLoading ? (
				<div className='font-bold'>Loading...</div>
			) : (
				<div className='flex flex-col space-y-2'>
					{products?.map(product => (
						<div className='rounded-2xl border-2 border-neutral-500 bg-neutral-600 p-2'>
							<div>{product.name}</div>
							<div>{product.price}</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default WithProducts(Products)
