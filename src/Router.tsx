import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import { productRoutes } from '@features/product/productRoutes'
import { AppClientProvider } from '@client/ApiContext'
import { client } from '@client/init'
import { Routes } from '@config/routes'
import { GraphIcon } from '@components/Icons/Icons'

function DefaultPage() {
	const navigate = useNavigate()
	const handleNavigate = () => {
		navigate(Routes.productRoutesPath.productList.absolutePath)
	}
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<div className='flex flex-col items-center space-y-3.5'>
				<img
					className='motion-safe:animate-bounce'
					src='https://vitejs.dev/logo.svg'
					alt='logo'
				/>
				<div className='text-2xl'>Senna labs new Front-end Template!</div>
				<div className='flex space-x-2'>
					<div className='text-xl'>Example Page</div>
					<div
						className='cursor-pointer text-xl font-bold underline hover:animate-ping'
						onClick={handleNavigate}
					>
						Click
					</div>
					<GraphIcon className='h-7 w-7' />
				</div>
			</div>
		</div>
	)
}

export default function Router(): ReactElement {
	const RouterComp = useRoutes([
		productRoutes,
		{
			path: '*',
			element: <DefaultPage />
		}
	])
	return (
		<AppClientProvider client={client}>
			<Suspense fallback={<div>Module Lazy loading...</div>}>
				{RouterComp}
			</Suspense>
		</AppClientProvider>
	)
}
