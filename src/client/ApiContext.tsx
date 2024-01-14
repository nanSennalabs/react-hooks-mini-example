import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { Client } from '@client/client'
import type { AppClientProviderType, AuthenticationContext } from './interfaces'

const ApiContext = createContext<{
	client: Client | null
	authentication?: AuthenticationContext
}>({
	client: null
})

export function AppClientProvider({ children, client }: AppClientProviderType) {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (
			client.auth.accessToken == null &&
			!location.pathname.includes('/auth')
		) {
			// navigate(RouterOriginPath.auth.login, { replace: true })
		}
	}, [client.auth.accessToken, location.pathname, navigate])

	const value = useMemo(
		(): {
			client: Client | null
			authentication?: AuthenticationContext
		} => ({
			client,
			authentication: {
				signOut: async () => client.auth.logout(),
				isAuthenticated: false,
				user: { data: undefined, isLoading: false }

				// isAuthenticated: !!user,
				// user: { data: user, isLoading }
			}
		}),
		[client]
	)

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useAppClient() {
	return useContext(ApiContext).client
}

export function useAuthentication() {
	const { authentication } = useContext(ApiContext)
	return authentication
}
