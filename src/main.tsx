
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './AppLayout.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/home/Dashboard.tsx'
import PublicLayout from './PublicLayout.tsx'
import AuthPage from './pages/auth/AuthPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route  element={<AppLayout />} >
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route  element={<PublicLayout />} >
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
