import Axios from 'axios'
import { QueryClient } from 'react-query'
import { API_URL } from '@config/config'
import { Client } from '@client/client'

const queryClient = new QueryClient()

const clientInstance = Axios.create({ baseURL: String(API_URL) })
const client = new Client(clientInstance)

export { client, queryClient }
