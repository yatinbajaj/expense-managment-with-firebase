import { useContext, useRef,Fragment } from 'react'
import authContext from '../../store/auth-context'
import classes from './Login.module.css';

function Login() {
    const ctx = useContext(authContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        if (email === 'root@gmail.com' && password === 'chitkara') {
            ctx.login();
        }
    }
    return (
        <Fragment>
            <div className={classes['login-heading']}>
                Login
            </div>
            <div className={classes['container']}>
                <form onSubmit={submitHandler}>
                    <div className={classes.controls}>
                        <label htmlFor="my-email">Email</label>
                        <input type="text" id="my-email" ref={emailRef} />
                    </div>
                    <div className={classes.controls}>
                        <label htmlFor="my-password">Password</label>
                        <input type="password" id="my-password" ref={passwordRef} />
                    </div>
                    <div className={classes.actions}>
                         <button type="submit" >
                            Authorize
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login;
