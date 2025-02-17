import  { useEffect, useState } from 'react'
import { getUserAccount } from '../../data/lib'

interface Organization {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

interface UserAccount {
  id: string;
  userId: string;
  active: boolean;
  isLocked: boolean;
  organization: Organization;
  createdAt: number;
  updatedAt: number;
}

// The array of user accounts
type UserAccounts = UserAccount[];

export default function Dashboard() {
  const [userAccount, setUserAccount] = useState<UserAccounts>([])
  useEffect(() => {
    const fetchUserAccount = async () => {
      const data = await getUserAccount()
      setUserAccount(data)
    }
    fetchUserAccount()
  }, []) 
  
  return (
    <>
    {userAccount.map((user) => (
      <div key={user.id}>
        <h1>{user.organization.name}</h1>
      </div>
    ))}
    </>
  )
}
