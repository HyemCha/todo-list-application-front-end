import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import Login from './Login';

function Copyright(){
    return<Typography variant='body2' color='textSecondary' align='center'>
        {"Copyright ©️ "}
        fsoftwareengineer, {new Date().getFullYear()}
        {"."}
    </Typography>
}
const AppRoute = () => {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<App/>} />
                    </Routes>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Router>
        </div>
    );
};

export default AppRoute;