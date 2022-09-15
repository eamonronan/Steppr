function InitialStepsMessage( {dailyEmotion, stepGoal} ) {
    
    let rosaStepMessage = "";

    const checkDailyEmotion = () => {
         if (dailyEmotion == 'fantastic') {
            rosaStepMessage="It makes me happy to know that you are thriving. A positive outlook can be a great asset when setting goals. The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        } else if (dailyEmotion == 'excellent') {
            rosaStepMessage="Most excellent! Your good mood is contagious. A positive outlook can be a great asset when setting goals. The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        } else if (dailyEmotion == 'good') {
            rosaStepMessage ="Good, great, grand! A positive outlook can be a great asset when setting goals. The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        } else if (dailyEmotion == 'not so good') {
            rosaStepMessage = "Feeling a bit blue? Hopefully we can change that together. One way to improve the mood is to set some achievable goals. The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        } else if (dailyEmotion == 'terrible') {
            rosaStepMessage = "Ah, I'm sorry. I've been there myself. Still, the fact that you are here is impressive. Setting achievable fitness goals can be the first step in improving your mood. The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        } else {
            rosaStepMessage = "The main focus of Steppr is to track your daily step count. To start, how many steps are you aiming to walk each day?";
        }
    }


    checkDailyEmotion();

    return (
        <div>{rosaStepMessage}</div>
    )
    }

    export default InitialStepsMessage