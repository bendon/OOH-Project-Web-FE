import nookies from 'nookies'
import CryptoJS from 'crypto-js';

const secretKey = "q9j3h87y23h87y23h87y23h87y23h87y"

export async function encryptText(text) {
    let encryptedText = CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
    encryptedText = encryptedText.replace('/', 'cht')
    return encryptedText;
}

function getApiUrl() {
    return import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "/api"
}

export async function decryptText(text) {
    if (text === null) {
        return;
    }
    if (text === undefined) {
        return;
    }
    let urlEncrypted = text.replace('cht', '/')
    const bytes = CryptoJS.AES.decrypt(urlEncrypted, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export async function authLogin(formData) {

    try {
        
        
        const email = formData.get('email')
        const password = formData.get('password')
        const response = await fetch(getApiUrl()+'/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        console.log(data);
        
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)
        const sessionUser  = {
            token: data.accessToken,
            user: data.user,
            expiry: expires,
            account: null,
            refreshToken: null,
            permissions: null,

        }
      
        nookies.set(null, "session", JSON.stringify(sessionUser), { expires, secure: true });

        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res
    } catch (err) {
       
        const res = {
            status: 400,
            data: null,
            error: err
        }

        return res
    }


}
export async function authGoogleLogin(formData) {

    try {
        const id_token = formData.get('id_token')
        const response = await fetch(getApiUrl()+'/auth/google/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: id_token }),
        })
        const data = await response.json()
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)

        const session = {
            token: data.accessToken,
            user: data.user,
            expires,
        }
        nookies.set(null, "session", JSON.stringify(session), { expires, secure: true });
        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res
    } catch (err) {
        const res = {
            status: 400,
            data: null,
            error: err
        }

        return res
    }


}

export async function authLogout() {
    nookies.destroy(null, "session")
}

export function getSession() {
    const cookies = nookies.get()
    const session = cookies.session ? JSON.parse(cookies.session) : null
    if (!session || !session.token || !session.user) {
        return null
    }
    return session
}

export async function getToken() {
    const session = await getSession()
    if (!session) {
        return null
    }
    return session.token
}

export async function getUserAccount() {
    try {

        const response  = await fetch(getApiUrl()+'/en/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
        const data  = await response.json()
        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res

    }catch(err){
        const res = {
            status: 400,
            data: null,
            error: err
        }

        return res
    }
}

export async function postSwitchAccount(formData) {
    try {

        const accountId = formData.get('accountId') 

        const response  = await fetch(getApiUrl()+'/en/switch/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify({ accountId }),
        })
        const data  = await response.json()
    
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)
        const sessionUser  = {
            token: data.accessToken,
            user: data.user,
            expiry: expires,
            account: data.account,
            refreshToken: data.refreshToken,
            permissions: data.permissions,

        }
      
        nookies.set(null, "session", JSON.stringify(sessionUser), { expires, secure: true });

        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res

    }catch(err){
        const res = {
            status: 400,
            data: null,
            error: err
        }

        return res
    }
}



export async function postUserLogOut() {
    try {

        nookies.destroy(null, "session", { path: "/" })
        const res = {
            status: 200,
            data: null,
            error: null
        }
        return res

    }catch(err){
        const res = {
            status: 400,
            data: null,
            error: err
        }

        return res
    }
}



