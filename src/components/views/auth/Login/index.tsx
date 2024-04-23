import Input from '@/components/ui/Input';
import styles from './Login.module.scss';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

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
    <AuthLayout title="Login" error="" link="/auth/register" linkText="Dont have an account? Register">
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <Input label="Email" name="email" type="email" placeholder="Input your email..." />

        {/* Password */}
        <Input label="Password" name="password" type="password" placeholder="Input your password..." />

        {/* Submit */}
        <Button variant="primary" type="submit" className={styles.login__button}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button variant="gray" type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })} className={styles.login__other__button}>
          <Icon icon="devicon:google" width="18" height="18" /> Login With Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
