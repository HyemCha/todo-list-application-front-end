import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';

function Copyright() {
    return <Typography variant='body2' color='textSecondary' align='center'>
        {"Copyright ©️ "}
        fsoftwareengineer, {new Date().getFullYear()}
        {"."}
    </Typography>
}
const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
            <div className="paddingDiv" style={{marginTop:"20px"}}/>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRoute;