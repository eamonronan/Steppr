/* import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../features/workouts/workoutSlice'; */
import AdminAssignTrainer from "./AdminAssignTrainer"


function UserItem({ enduser } ) {

    /* const dispatch = useDispatch(); */

    return (
        <div className="workout">
            <h2>{enduser.firstName} {enduser.lastName}</h2>
            <p>Step goal: {enduser.stepGoal}</p>
            <p>Primary goal: {enduser.userPrimaryGoal}</p>
            <p>Secondary goal: {enduser.userSecondaryGoal}</p>
            <div className="adminUserButtons">
            <button className='btnadmin' onClick={()=>console.log("user")}>Delete user</button>
            <button className='btnadmin' onClick={<AdminAssignTrainer/>}>Assign trainer</button>
            </div>
        </div>
    )
}

export default UserItem