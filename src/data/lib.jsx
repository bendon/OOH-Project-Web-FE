import nookies,{destroyCookie} from 'nookies'
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { searchableQuery } from './Utilities';

const secretKey = "q9j3h87y23h87y23h87y23h87y23h87"

 const axiosApp = axios
 axiosApp.defaults.withCredentials = false;

export  function encryptText(text) {
    const encrypted = CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
    const urlSafeEncrypted = encodeURIComponent(encrypted); // ✅ URL-safe encoding
    return urlSafeEncrypted;
}



export  function decryptText(text) {
    if (!text) return null;
    try {
        const decodedEncrypted = decodeURIComponent(text); // ✅ Decode URL-safe text
        const bytes = CryptoJS.AES.decrypt(decodedEncrypted, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error('Decryption failed');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error.message);
        return null;
    }
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



export async function authLogin(formData) {

    try {
        
        
        const email = formData.get('email')
        const password = formData.get('password')
      
        const {data} = await axiosApp.post(getApiUrl()+'/auth/login', { email, password })
     
      
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)
        const sessionUser  = {
            token: data.accessToken,
            user: data.user,
            expiry: expires,
            account: null,
            refreshToken: null,
            permissions: null,

        }
       const encryted =  encryptText(JSON.stringify(sessionUser));

        nookies.set(null, "_session",encryted, { expires, secure: true });

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
     
        const { data } =  await axiosApp.post(getApiUrl()+'/auth/google/verify', { token: id_token }, {
            headers: { 'Content-Type': 'application/json' },

        })
        const expires = new Date(Date.now() + 6 * 60 * 60 * 1000)

        const sessionUser  = {
            token: data.accessToken,
            user: data.user,
            expiry: expires,
            account: null,
            refreshToken: null,
            permissions: null,

        }
        const encryted =  encryptText(JSON.stringify(sessionUser));
        nookies.set(null, "_session", encryted, { expires, secure: true });
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
    nookies.destroy(null, "_session")
}

export async function getSession() {

    const cookies = nookies.get()

    const session = cookies._session ? cookies._session : null

    const decrypted =   decryptText(session)

    if (!session) {
        return null
    }
    
    const sessionUser = JSON.parse(decrypted)
    if (!sessionUser || !sessionUser.token || !sessionUser.user) {
        return null
    }
    return sessionUser
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

        const {data}  = await axiosApp.get(getApiUrl()+'/en/accounts', {
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

export async function getStaffs(payload) {
    try {

        const search = searchableQuery(payload)

        const {data}  = await axiosApp.get(getApiUrl()+'/en/sl/staffs'+search, {
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

export async function getStaffById(staffId) {
    try {

        const {data}  = await axiosApp.get(getApiUrl()+'/en/sl/staff/'+staffId, {
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
        const {data}  = await axiosApp.post(getApiUrl()+'/en/switch/account', { accountId }, {
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
            // refreshToken: data.refreshToken,
            // permissions: data.permissions,

        }

        localStorage.setItem('_rtn', encryptText(data.refreshToken))
        localStorage.setItem('_pm', encryptText(JSON.stringify(data.permissions)))

        const encryted =  encryptText(JSON.stringify(sessionUser));
      
        nookies.set(null, "_session", encryted, { expires, secure: true });

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

        destroyCookie(null, '_session')
        nookies.destroy(null, "_session")
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

        const {data}  = await axiosApp.get(getApiUrl()+'/en/sl/roles', {
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

export async function updateRole(payload) {
    try {

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/role/update', payload, {
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

export async function createRole(payload) {
    try {

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/role', payload, {
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

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/new/staff', payload, {
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
export async function getUserAnalytics() {
    try {

        const {data}  = await axiosApp.get(getApiUrl()+'/en/sl/organization/user/analytics', {
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

export async function getUserProfile() {
    try {

        const {data}  = await axiosApp.get(getApiUrl()+'/en/profile', {
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

export async function updateUserPassword(payload) {
    try {

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/change/password',payload, {
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


export async function uploadFiles(payload) {
    try {

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/upload/files',payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

export async function postCreateBillboard(payload) {
    try {

        const {data}  = await axiosApp.post(getApiUrl()+'/en/sl/billboard',payload, {
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

export async function getBillBoards(payload) {
    try {
        const search =  searchableQuery(payload)

        const {data}  = await axiosApp.get(getApiUrl()+'/en/sl/billboards'+search, {
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

export async function getFileStream(fileName) {
    try {

        const res  = await axiosApp.get(getApiUrl()+'/en/sl/file/'+fileName, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            responseType: 'blob'
        })
        return {
            status: 200,
            data: window.URL.createObjectURL(new Blob([res.data])),
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

export async function getBoardById(billboardId) {
    try {

        const res  = await axiosApp.get(getApiUrl()+'/en/sl/billboard/'+billboardId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardReport() {
    try {

        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/organization', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardWeeklyReport(payload) {
    try {

        const search  = searchableQuery(payload)
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/weekly'+search, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardMonthlyReport(payload) {
    try {

        const search  = searchableQuery(payload)
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/monthly'+search, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardLocationsUploads(payload) {
    try {

        const search  = searchableQuery(payload)
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/locations'+search, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardTypeReport(payload) {
    try {

        const search  = searchableQuery(payload)
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/types'+search, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getBoardTypes() {
    try {
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/list/billboard/types', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function postBoardType(payload) {
    try {
        const res  = await axiosApp.post(getApiUrl()+'/en/sl/create/billboard/types', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getOrganizationPermisions() {
    try {
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/permissions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })

        const optimized  = res.data.reduce((acc, permission) => {
            const { type } = permission;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(permission);
            return acc;
        }, {});

        console.log(optimized);
        
        return {
            status: 200,
            data: optimized,
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

export async function getOrganizationStaffPermissions(staffId) {
    try {
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/permission/staff/'+staffId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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

export async function getUserOrganizationUploadReport(payload) {
    try {
        const search = searchableQuery(payload)
        const res  = await axiosApp.get(getApiUrl()+'/en/sl/report/billboard/user/organization'+search, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        })
        return {
            status: 200,
            data: res.data,
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





