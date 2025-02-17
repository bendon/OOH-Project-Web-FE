import nookies from 'nookies'

export const isAuthenticated = () : boolean => {
    const cookies = nookies.get()
    const session = cookies.session
    if(session === undefined)
    {
        return false
    }
    const sessionData = JSON.parse(session)
    const expires = new Date(sessionData.expires)
    if(expires < new Date())
    {
        nookies.destroy(null,"session")
        return false
    }
    return true
}