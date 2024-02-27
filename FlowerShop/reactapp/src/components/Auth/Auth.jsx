import React, { useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { urlAuth } from "../../urls/urlList";

const Auth = () => {
    const [showError, setShowError] = useState(false);
    const cookies = new Cookies();
    const [user, setUser] = useState({
        name: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const cookiesLive = 604800; // Неделя

    const SignIn = (event) => {
        event.preventDefault();

        try {
            if (user.name === "" || user.password === "") {
                throw new Error("Введите имя пользователя и пароль");
            }

            axios.post(urlAuth, user)
                .then(res => {
                    cookies.set('access_token', res.data.access_token, { path: '/', maxAge: cookiesLive });
                    cookies.set('userId', res.data.userId, { path: '/', maxAge: cookiesLive });
                    cookies.set('userRole', res.data.userRole, { path: '/', maxAge: cookiesLive });
                    cookies.set('userName', res.data.userName, { path: '/', maxAge: cookiesLive });
                    window.location.replace('http://localhost:3000')
                })
                .catch(function (error) {
                    if (error.response) {
                        setShowError(true);
                        setErrorMessage(error.response.data.detail);
                    }
                });

        } catch (error) {
            setShowError(true);
            setErrorMessage(error.message);
        }
    }

    const ErrorMessage = () => {
        return (
            <div>
                {errorMessage}
            </div>
        )
    }

    return (
        <div className="container">
            <h1> </h1><br></br>
            <h1> </h1><br></br>
            <h1> </h1><br></br>
            <h1>Авторизация</h1><br></br>
            {showError ? <ErrorMessage /> : null}
            
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Логин</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Логин"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Пароль</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Пароль"
                    type="password"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                />
            </InputGroup>
            <Button onClick={SignIn}>Войти</Button>
            <h1> </h1><br></br>
            <h1> </h1><br></br>
        </div>
    );
}
export default Auth;