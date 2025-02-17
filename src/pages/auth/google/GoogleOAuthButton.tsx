import { useGoogleLogin } from '@react-oauth/google'
import { authGoogleLogin } from '../../../data/lib';
import { useNavigate } from 'react-router';
import { useState } from 'react';



export default function GoogleOAuthButton() {

  const [error, setError] = useState(null);

    const navigate = useNavigate()
    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: tokenResponse => handleSuccess(tokenResponse),
        onError: () => handleError(),
        scope: 'openid email profile',
      });
    
      const handleSuccess = async (payload: any) => {
        try{
        
            const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              code: payload.code,
              client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
              client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
              redirect_uri: import.meta.env.VITE_REDIRECT_URI,
              grant_type: 'authorization_code',
            }),
          });
      
          const data = await response.json();
          const { id_token } = data;
          const formdata = new FormData()
          formdata.append("id_token", id_token)

          try{
            const d = await authGoogleLogin(formdata)
            if (d.status === 200){
              navigate("/")
            }else{
              setError(d.message)
            }

          // navigate("/")
          }catch(error){
            console.log(error)
          }
        
          // You can use the id_token for user authentication or send it to your backend
        } catch (error) {
          console.error('Error exchanging authorization code:', error);
        }
        
      };

    const handleError = () => {
        console.log("Google Sign-In Failed");
      };
  return (
    <>
    { error && <p className='alert alert-danger p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}> {error}</p>}
    <button className="btn btn-phoenix-secondary w-100 mb-3" onClick={()=>login()}>  <span className="fab fa-google text-danger me-2 fs-9"><img src='/project/google-store.png' alt='google' width={24} /> </span>Sign in with google</button>
    </>
    
  )
}
