import config from '../config.json'
import { saveToLocalStorage, getFromLocalStorage} from './localStorage'

export function makeApiCallFunction({ url, method, body }) {
    return async () => {
        if (url === undefined) return console.error('URL is required to make an API call')
        if ((['POST', 'GET', 'PUT', 'DELETE'].includes(method.toUpperCase())) !== true) {
            return console.error('Incorrect request method')
        }
        

        async function makeRequestWithAccessToken({ method, body }) {
            const accessToken = getFromLocalStorage({ key: 'accessToken' })
            if (accessToken === null) {
                try {
                    await refreshAccessToken()
                } catch (e) {
                    return console.error(e)
                }
            }
    
            const createRequestOptions = (accessToken) =>  {
                return {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(body)
                }
            }
    
            const resp = await fetch(`${config.apiUrl}${url}`, createRequestOptions(accessToken))
            return resp
        }
        
        let resp
        resp = await makeRequestWithAccessToken({ method, body })

        if (resp.status === 401) {     
            try {
                await refreshAccessToken()
            } catch (e) {
                return console.error(e)
            }
            resp = await makeRequestWithAccessToken({ method, body })
        }
        return resp
    }
}

async function refreshAccessToken() {
    const refreshToken = getFromLocalStorage({ key: 'refreshToken' })
    if (refreshToken === null) throw new Error('Missing refresh token')

    const refreshTokenCall = makeApiCallFunction({
        url: '/user/token',
        method: 'POST',
        body: { refreshToken }
    })
    const resp = await refreshTokenCall(refreshToken)
    if (resp.status === 401) throw new Error('Refresh token is invalid')
    if (resp.status === 403) throw new Error('Missing refresh token on API call')

    const data = await resp.json()
    saveToLocalStorage({ key: 'accessToken', value: data.accessToken })    
}
