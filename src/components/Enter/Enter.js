import './Enter.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/useAuth';

function Enter() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailDirty, setEmailDirty] = useState(false);
    const [ passwordDirty, setPasswordirty ] = useState(false);
    const [ emailError, setEmailError] = useState('Необходимо заполнить поле');
    const [ passwordError, setPasswordError] = useState('Необходимо заполнить поле');
    const [ formValid, setFormValid ] = useState(false);

        const navigate = useNavigate();
        const location = useLocation();
        const {signin} = useAuth();

        const fromPage = location.state?.from?.pathname || '/';
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const user = form.email.value;
            signin(user, () => navigate(fromPage, {replace: true}));
        }

    useEffect(() => {
        if(emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError('Введите корректный email')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setPasswordError('Пароль дожен быть длиннее 8 символов');
        }  else { 
            setPasswordError('')
        }
    }
    const blurHadler =(e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordirty(true)
                break
        }
    }
    

    return (
        <div className="enter">
            <h1 className="enter-heading">Вход</h1>
            <form className="enter-container" onSubmit={handleSubmit}>
                <label htmlFor="email" className="enter-container__label"><span className="enter-container__req">*</span>Email
                    {(emailDirty && emailError) && <span className="enter-container__error-email">{emailError}</span>}
                </label>
                <div className="enter-container__input">
                    <input
                        type="text"
                        id="email"
                        placeholder="Введите email"
                        className="enter-container__input-text"
                        name="email"
                        onBlur={(e) => blurHadler(e)}
                        value = {email}
                        onChange ={emailHandler}
                    />
                </div>
                <label htmlFor="password" className="enter-container__label"><span className="enter-container__req">*</span>Пароль
                    {(passwordDirty && passwordError) && <span className="enter-container__error-password">{passwordError}</span>}
                </label>
                <div className="enter-container__input">
                    <input
                        type="password"
                        id="password"
                        placeholder="Введите пароль"
                        className="enter-container__input-text"
                        name="password"
                        onBlur={(e) => blurHadler(e)}
                        value = {password}
                        onChange ={passwordHandler}
                    />
                </div>
                <input className="enter-container__button" type="submit" value="Войти" disabled={!formValid} />
            </form>
            
        </div>
    )
}

export default Enter;