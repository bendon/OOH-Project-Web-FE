import nookies from 'nookies'
import CryptoJS from 'crypto-js';
import axios from 'axios';

const secretKey = "q9j3h87y23h87y23h87y23h87y23h87y"

export async function encryptText(text) {
    let encryptedText = CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
    encryptedText = encryptedText.replace('/', 'cht')
    return encryptedText;
}

function getApiUrl() {
    return import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "/api"
}

export function convertToHumanReadable  (dateString) {
    const date = new Date(dateString * 1000);
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    return date.toLocaleDateString('en-US', options);
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
      
        const {data} = await axios.post(getApiUrl()+'/login', { email, password })
     
      
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
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }

        return res
    }


}
export async function authGoogleLogin(formData) {

    try {
        const id_token = formData.get('id_token')
     
        const { data } =  await axios.post(getApiUrl()+'/auth/google/verify', { token: id_token }, {
            headers: { 'Content-Type': 'application/json' },

        })
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
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
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

        const {data}  = await axios.get(getApiUrl()+'/en/accounts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })

        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res

    }catch(err){
        const res = {
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }
        return res
    }
}

export async function getStaffs() {
    try {

        const {data}  = await axios.get(getApiUrl()+'/en/sl/staffs', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })

        

        const res = {
            status: 200,
            data: data,
            error: null
        }

        return res

    }catch(err){
        const res = {
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }
        return res
    }
}

export async function postSwitchAccount(formData) {
    try {

        const accountId = formData.get('accountId') 
        const {data}  = await axios.post(getApiUrl()+'/en/switch/account', { accountId }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
    
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
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
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


export async function getRoles() {
    try {

        const {data}  = await axios.get(getApiUrl()+'/en/sl/roles', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
        return {
            status: 200,
            data: data,
            error: null
        }

    }catch(err){
        return {
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }
    }
}

export async function createTeamMember(payload) {
    try {

        const {data}  = await axios.post(getApiUrl()+'/en/sl/new/staff', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
        console.log(data);
        
        return {
            status: 200,
            data: data,
            error: null
        }

    }catch(err){
        return {
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }
    }
}
export async function getUserAnalytics() {
    try {

        const {data}  = await axios.get(getApiUrl()+'/en/sl/organization/user/analytics', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
        })
        return {
            status: 200,
            data: data,
            error: null
        }

    }catch(err){
        return {
            status: err.status,
            data: null,
            error: err.response ? err.response.data.message : 'Something went wrong'
        }
    }
}


