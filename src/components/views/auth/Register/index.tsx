import Input from '@/components/ui/Input';
import styles from './Register.module.scss';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';
import authServices from '@/services/auth';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      setError('Email is already registered!');
    }
  };

  return (
    <AuthLayout title="Register" error={error} link="/auth/login" linkText="Already have an account? Login">
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <Input name="email" type="email" label="Email" placeholder="Input your email..." />

        {/* Fullname */}
        <Input name="fullname" type="text" label="Fullname" placeholder="Input your fullname..." />

        {/* Phone */}
        <Input name="phone" type="text" label="Phone" placeholder="Input your number phone..." />

        {/* Password */}
        <Input name="password" type="password" label="Password" placeholder="Input your password..." />

        {/* Submit */}
        <Button type="submit" variant="primary" className={styles.register__button}>
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
