import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Rosa() {

    const { user } = useSelector((state) => state.auth);


    return (
        <>
        {(user && user.userPrimaryGoal != null && user.userSecondaryGoal != null) ? (

            <div>Rosa Daily</div>
        ) : (
            <div>Rosa Initial </div>
        )}
        
        </>
    )}

export default Rosa