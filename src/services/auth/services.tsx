import bcrypt from 'bcrypt';
import { addData, retrieveDataByField } from '@/lib/firebase/service';

// Fungsi register
export async function signUp(
  userData: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField('users', 'email', userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date().toISOString();
    userData.updated_at = new Date().toISOString();
    await addData('users', userData, (result: boolean) => {
      callback(result);
    });
  }
}

// Fungsi login
export async function signIn(email: string) {
  const data = await retrieveDataByField('users', 'email', email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

// Fungsi login with google
export async function signInWithGoogle(
  data: {
    email: string;
    role?: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
  },
  callback: Function
) {
  const user = await retrieveDataByField('users', 'email', data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = 'member';
    data.created_at = new Date().toISOString();
    data.updated_at = new Date().toISOString();
    data.password = '';
    await addData('users', data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
