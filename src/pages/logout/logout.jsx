import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/authentication/actionCreator';
import { useHistory } from 'react-router-dom';

const AuthInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const SignOut = e => {
        e.preventDefault();
        dispatch(logOut());
    };

    useEffect(() => {
        dispatch(logOut());
        history.push('/login');
    }, []);

    return (
        null
    );


};

export default AuthInfo;
