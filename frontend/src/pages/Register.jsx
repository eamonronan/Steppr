import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';


function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        //userRole: ''
    })

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))

    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password mismatch');
        } else {
            const userData = {
                firstName,
                lastName,
                email,
                password,
                //userRole
            }
            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account to use Steppr.</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='text' className='form-control' id='firstName' name='firstName' value={firstName} placeholder='Enter first name'
                            onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type='text' className='form-control' id='lastName' name='lastName' value={lastName} placeholder='Enter surname'
                            onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter email address'
                            onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter password'
                            onChange={onChange} />
                    </div>
                    
                    <div className='form-group'>
                        <input type='password' className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm password'
                            onChange={onChange} />
                    </div>
                    {/* <div className='form-group'>
                        <input type='checkbox' className='form-control' id='trainer' name='trainer' value={userRole} /> Trainer
                    </div>
                    <div className='form-group'>
                        <input type='checkbox' className='form-control' id='enduser' name='enduser' value={userRole} /> User
                    </div> */}
                
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>

            </section>
        </>
    )
}

export default Register