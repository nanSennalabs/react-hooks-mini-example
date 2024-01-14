import { BrowserRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
import Router from './Router'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	)
}
