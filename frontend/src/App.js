import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Rosa from './components/Rosa';
import RosaDaily from './components/RosaDaily';
import Resources from './pages/Resources';
import AdminDashboard from './components/admin/Dashboard';
import UserGoalInformation from './components/UserGoalInformation';

function App() {



  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/rosa' element={<Rosa/>}/>
            <Route path='/rosadaily' element={<RosaDaily />}/>
            <Route path='/resources' element={<Resources/>}/>
            <Route path='/usergoalinfo' element={<UserGoalInformation/>}/>
          
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
