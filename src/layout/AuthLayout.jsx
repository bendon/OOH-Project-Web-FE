import React from 'react'
import { getSession } from '../data/lib';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
    const session = getSession();
    return session && session.token ? <Navigate to="/" /> : <Outlet />;
}
