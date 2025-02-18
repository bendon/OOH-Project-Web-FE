import { User } from "lucide-react";

interface Organization {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
  }
  
  interface UserRecord {
    id: string;
    userId: string;
    active: boolean;
    isLocked: boolean;
    organization: Organization;
    createdAt: number;
    updatedAt: number;
  }
  
  // The main array that contains user records
  type UserAccounts = UserRecord[];


  

  interface Organization {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
  }
  
  interface Account {
    id: string;
    userId: string;
    active: boolean;
    isLocked: boolean;
    organization: Organization;
    createdAt: number;
    updatedAt: number;
  }
  
  interface User {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: number;
    country: string;
    gender: number;
    verified: boolean;
    active: boolean;
    createdAt: number;
    updatedAt: number;
  }
  
  interface AuthData {
    user: User;
    account: Account;
    accessToken: string;
    refreshToken: string;
    permissions: string[];
  }

  interface UserSession {
    token : string;
    refreshToken : string | null;
    user : User;
    account : Account | null;
    permissions : string[] | null;
    expiry : Date;
  }
type  SessionObject = UserSession | null;


interface errorResponse {
  status: number;
  message: string;
}

interface ResponseResults {
  status: number;
  data?: any | null;
  error?: any | null;
}

// export all
export type {
    User,
    Account,
    AuthData,
    UserSession,
    SessionObject,
    UserAccounts,
    Organization,
    UserRecord,
    ResponseResults
  };
