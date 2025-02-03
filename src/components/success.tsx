import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState{
    username:string;
}

const SuccessPage: React.FC = () => {

    const location = useLocation();
    const {username} = location.state as LocationState;

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Login Successful!</h1>
            <p>Welcome {username}!</p>
            <button
                onClick={handleLogout}
                style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                }}
            >Logout</button>
        </div>
    );
};

export default SuccessPage;
