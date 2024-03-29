import LoginForm from "@/components/LoginForm/LoginForm"
import { handleGithubLogin } from "@/lib/actions"
import styles from './login.module.css'

const Login = () => {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login With Github</button>
                </form>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login