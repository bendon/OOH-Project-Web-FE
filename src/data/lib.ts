import CryptoJS from 'crypto-js';

import nookies from 'nookies'
// import { setStoreUser } from './client/client';
// import { useUserStore } from '@/store/User';

const secretKey = "q9j3h87y23h87y23h87y23h87y23h87y"

// const setUser = useUserStore((state : any) => state.setUser)

export async function encryptText(text: string) {
    let encryptedText = CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
    encryptedText = encryptedText.replace('/', 'cht')
    return encryptedText;
}

export async function decryptText(text: string | null | undefined) {
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

export async function authLogin(formData: FormData) {

    try {
        const email = formData.get('email')
        const password = formData.get('password')
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)
        console.log(data)
        const session = {
            token: data.accessToken,
            user: data.user,
            expires,
        }
        nookies.set(null, "session", JSON.stringify(session), { expires, secure: true });

        return data
    } catch (error) {
        return error
    }


}

export async function authGoogleLogin(formData: FormData) {

    try {
        const id_token = formData.get('id_token')
        const response = await fetch('/api/auth/google/verify', {
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
        return data
    } catch (error) {
        return error
    }


}

export async function authLogout() {
    nookies.destroy(null, "session")
}

export async function getSession() {
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

        const response  = await fetch('/api/en/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
        const data  = await response.json()
        return data

    }catch(error){
        return error
    }
}



