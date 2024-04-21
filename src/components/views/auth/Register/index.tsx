import Link from 'next/link';
import styles from './Register.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

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

    const result = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={styles.register__form__item__input} placeholder="Input your email..." />
          </div>

          {/* Fullname */}
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input id="fullname" name="fullname" type="text" className={styles.register__form__item__input} placeholder="Input your fullname..." />
          </div>

          {/* Phone */}
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="text" className={styles.register__form__item__input} placeholder="Input your number phone..." />
          </div>

          {/* Password */}
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className={styles.register__form__item__input} placeholder="Input your password..." />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
