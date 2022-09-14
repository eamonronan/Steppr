import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkout } from '../features/workouts/workoutSlice';
import FileBase64 from 'react-file-base64';


function WorkoutForm() {
    const { user } = useSelector((state) => state.auth);

    const [workoutData, setWorkoutData] = useState({user: user, text: '', selectedFile: ''});

    

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createWorkout({ workoutData }));
        
    }

    return (
        <section className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Workout information</label>
                    <input type='text' name='text' id='text' value={workoutData.text}
                        onChange={(e) => setWorkoutData({...workoutData, text: e.target.value})} />
                    <FileBase64 type="file" multiple={false} onDone={({base64}) => setWorkoutData({...workoutData, selectedFile: base64})}/>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add workout
                    </button>
                </div>
            </form>
        </section>
    )
}

export default WorkoutForm