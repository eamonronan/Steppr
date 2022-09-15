import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RosaDaily from './RosaDaily';
import RosaInitial from './RosaInitial';

function Rosa() {

    const { user } = useSelector((state) => state.auth);


    return (
        <>
        {(user && user.userStepCount != null) ? (

            <RosaDaily/>
        ) : (
           <RosaInitial/>
        )}
        
        </>
    )}

export default Rosa