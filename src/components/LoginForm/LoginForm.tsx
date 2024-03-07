"use client"
import { login } from '@/lib/actions';
import styles from './loginForm.module.css';
import { useFormState } from "react-dom";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
    const [state, formAction] = useFormState(login, null);
    const router = useRouter()
    // useEffect(() => {
    //     state?.success && router.push('/login')
    // }, [state?.success, router])
    return (
        <form className={styles.container} action={formAction} >
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button>Login</button>
            {state?.error && <p>{state?.error}</p>}
            <Link href={'/register'}>
                Don't have an account? <b>Register</b>
            </Link>
        </form>
    )
}

export default LoginForm;