import React,{useState,ChangeEvent,FormEvent} from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormState {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formState,setFormState] = useState<LoginFormState>({username:'',password:''});
    const [error, setError] = useState<string | null > (null);

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setFormState({
            ...formState,[name]:value,
        });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formState.username || !formState.password){
            setError('Both fields are required..');
            return;
        }
        setError(null);

        if (formState.username === 'Admin' && formState.password === 'admin123') {
            console.log('Login successful with:',formState);
            navigate('/display', { state: { username: formState.username } });
        }else {
            setError('Invalid username or password.');
            setFormState({ username: '', password: '' });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 d-flex align-items-center">
                                <label className="form-label me-2" style={{ minWidth: '100px' }}>Username</label>
                                <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formState.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                autoComplete="off"
                                required
                                />
                            </div>
                            <div className="form-group mb-3 d-flex align-items-center">
                                <label className="form-label me-2" style={{ minWidth: '100px' }}>Password</label>
                                <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formState.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                autoComplete="off"
                                required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button type="submit" className="btn btn-success w-20">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;