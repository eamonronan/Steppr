import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../features/workouts/workoutSlice';
import moment from 'moment';


function WorkoutItem({ workout } ) {

    const dispatch = useDispatch();

    return (
        <div className="workout">
            <div>
                {moment(workout.createdAt).format("MMM Do YY")}
                <div>
                    {moment(workout.createdAt).fromNow()}
                </div>
            </div>
            <h2>{workout.text}</h2>
            {/* <img className="workoutImage" src={workout.selectedFile} /> */}
            <button onClick={() => dispatch(deleteWorkout(workout._id))} className='close'>X</button>
        </div>
    )
}

export default WorkoutItem