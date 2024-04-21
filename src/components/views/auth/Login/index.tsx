import Link from 'next/link';
import styles from './Login.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { redirect } from 'next/dist/server/api-utils';

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn('credentials', {
        email: form.email.value,
        password: form.password.value,
        redirect: false,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={styles.login__form__item__input} placeholder="Input your email..." />
          </div>

          {/* Password */}
          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className={styles.login__form__item__input} placeholder="Input your password..." />
          </div>
          <button type="submit" className={styles.login__form__button}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <hr className={styles.login__form__devider} />
        <div className={styles.login__form__other}>
          <button type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })} className={styles.login__form__other__button}>
            <Icon icon="devicon:google" width="20" height="20" /> Login With Google
          </button>
        </div>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t have an account yet? <Link href="/auth/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginView;
