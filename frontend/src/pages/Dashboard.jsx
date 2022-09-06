import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutItem from '../components/WorkoutItem';
import Spinner from '../components/Spinner';
import {getWorkouts} from '../features/workouts/workoutSlice';
import {reset} from '../features/auth/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const {workouts, isLoading, isError, message} = useSelector((state) => state.workouts);

  // redirect to log-in page if user is not logged in
  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login');
    }

    dispatch(getWorkouts());

    return () => {
      dispatch(reset());
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <section className="heading">
    <h4>Welcome to your Steppr account, {user && user.name}</h4>
    <p>Workout dashboard</p>
    </section>
    <WorkoutForm />

    <section className="content">
      {workouts.length > 0 ? (
        <div className="workouts">
          {workouts.map((workout) => (
            <WorkoutItem key={workout._id} id={workout._id} workout={workout} />
          ))}

        </div>
      ) : (<h3>You have not logged any workouts yet! </h3>)}

    </section>

    
    </>
  )
}

export default Dashboard