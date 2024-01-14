import { queryClient } from '@client/init'
import type { AuthFunctionListenerType } from '@client/interfaces'
import type { AxiosInstance } from 'axios'

export class AuthenClientActions {
  constructor(
    private readonly client: AxiosInstance,
    private readonly authStateListener: AuthFunctionListenerType = []
  ) {}

  notifyAuthStateListener(token: string) {
    this.authStateListener.forEach(listener => { listener(token); })
  }

  get accessToken() {
    return sessionStorage.getItem('act')
  }

  set accessToken(token) {
    if (typeof token === 'undefined' || token === null) {
      sessionStorage.removeItem('act')
      return
    }

    this.notifyAuthStateListener(token)
    sessionStorage.setItem('act', token)
  }

  get refreshToken() {
    return sessionStorage.getItem('rft')
  }

  set refreshToken(token) {
    if (typeof token === 'undefined' || token === null) {
      sessionStorage.removeItem('rft')
      return
    }

    sessionStorage.setItem('rft', token)
  }

  async refreshAccessToken() {
    try {
      // const response = await this.client.post('/refresh_token', {
      //   refresh_token: this.refreshToken,
      // })
      this.accessToken = '' // TODO: using reponse data
      this.refreshToken = '' // TODO: using reponse data
    } catch (error) {
      this.accessToken = null
      this.refreshToken = null
      this.notifyAuthStateListener(this.accessToken!)
    }
  }

  async login(credential: { identifier: string; password: string }) {
    const response = await this.client.post('/auth/local', credential)
    this.accessToken = response.data.jwt
    // this.refreshToken = response.data.refresh_token
    await queryClient.invalidateQueries('user-profile')
    return response
  }

  async logout() {
    // await this.client.delete('/sessions')
    this.accessToken = null
    this.refreshToken = null
    sessionStorage.clear()
  }

  async profileUser() {
    try {
      const response = await this.client.get('/users/me')
      return response.data.user
    } catch (error) {
      return undefined
    }
  }

  async requestOtp(identifier: { phone_number: string }) {
    try {
      const response = await this.client.post('/auth/request-otp', identifier)
      return response
    } catch (error) {
      return error
    }
  }

  async requestOtpResetPassword(identifier: { phone_number: string }) {
    const response = await this.client.post(
      '/auth/verify-phonenumber',
      identifier
    )
    return response
  }

  async checkGrantee(grantId: number) {
    try {
      const response = await this.client.get(`/meeting-grantees/${grantId}`)
      return response
    } catch (error) {
      return error
    }
  }

  async verifyOtpGrant(credential: {
    phone_number: string
    meeting_grantee_id: string
    ref: string
    otp: string
  }) {
    try {
      const response = await this.client.post(
        '/auth/verify-otp-grant',
        credential
      )
      // if (response.data.jwt) {
      //   this.accessToken = response.data.jwt
      // }
      return response
    } catch (error) {
      return error
    }
  }

  async verifyOtpResetPassword(credential: {
    phone_number: string
    ref: string
    otp: string
  }) {
    try {
      const response = await this.client.post(
        '/auth/verify-otp-reset-password',
        credential
      )
      return response
    } catch (error) {
      return error
    }
  }

  async changePassword(credential: {
    resetPasswordToken?: string
    password: string
  }) {
    const response = await this.client.post('/auth/change-password', credential)
    return !!response
  }

  async createGrant(credential: {
    register_token: string
    password: string | undefined
  }) {
    const response = await this.client.post('/auth/register-grant', credential)
    return response
  }

  async verifyPassword(password: string) {
    const response = await this.client.post('/auth/verify-password', {
      password,
    })
    return !!response
  }
}
