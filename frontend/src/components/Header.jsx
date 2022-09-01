import { FaSignInAlt, FaSignOutAlt, FaUser, FaGrinAlt, FaBook, FaRunning } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className='header'>

            <Link to='/'> <FaRunning /> Steppr
            </Link>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/rosadaily'>
                                <FaGrinAlt /> Rosa Daily
                            </Link>

                        </li>
                        <li>
                            <Link to='/rosa'>
                                <FaGrinAlt /> Rosa
                            </Link>

                        </li>
                        <li>
                            <Link to='/resources'>
                                <FaBook /> Resources
                            </Link>
                        </li>

                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>


                    </>



                ) : (<>  <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                    <li>
                        <Link to='/rosa'>
                            <FaGrinAlt /> Rosa
                        </Link>

                    </li>
                    <li>
                        <Link to='/resources'>
                            <FaBook /> Resources
                        </Link>
                    </li>
                </>)}

            </ul>


        </header>
    )
}

export default Header