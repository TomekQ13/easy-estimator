import config from '../config.json'

export function makeApiCallFunction({ url, method, body, accessToken, refreshToken, setAccessTokenFunction }) {
    return async () => {
        if (url === undefined) return console.error('URL is required to make an API call')
        if ((['POST', 'GET', 'PUT', 'DELETE'].includes(method.toUpperCase())) !== true) {
            return console.error('Incorrect request method')
        }
        

        async function makeRequestWithAccessToken({ method, body }) {
   
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
    
            let resp
            try {
                resp = await fetch(`${config.apiUrl}${url}`, createRequestOptions(accessToken))
            } catch (e) {
                return console.log('There was an error while fetching data')
            }
            
            return resp
        }
        
        let resp
        resp = await makeRequestWithAccessToken({ method, body })

        if (resp.status === 401) {     
            console.log('Received status 401. Refreshing access token.')
            try {
                await refreshAccessToken({ refreshToken , setAccessTokenFunction})
            } catch (e) {
                return console.log('There was an error while refreshing access token')
            }
            resp = await makeRequestWithAccessToken({ method, body })
        }

        if (resp.status === 403) {
            console.log('Received status code 403')
        }
        return resp
    }
}

async function refreshAccessToken({ refreshToken, setAccessTokenFunction }) {
    if (refreshToken === null) throw new Error('Missing refresh token')

    const refreshTokenCall = makeApiCallFunction({
        url: '/user/token',
        method: 'POST',
        body: { refreshToken },
        accessToken: '',
        refreshToken,
        setAccessTokenFunction
    })
    const resp = await refreshTokenCall(refreshToken)
    if (resp.status === 401) throw new Error('Refresh token is invalid')
    if (resp.status === 403) throw new Error('Missing refresh token on API call')

    const data = await resp.json()
    setAccessTokenFunction(data.accessToken)    
}
