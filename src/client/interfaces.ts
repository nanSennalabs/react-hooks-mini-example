import type { Client } from '@client/client'

type Func = (data: string) => void
export type AuthFunctionListenerType = Func[]

export interface CredentialType {
	tel: string
	password: string
}

export interface AppClientProviderType {
	children: React.ReactNode
	client: Client
}

export interface AuthenticationContext {
	isAuthenticated: boolean
	signOut: () => Promise<void>
	user: { data: undefined | undefined; isLoading: boolean }
}
