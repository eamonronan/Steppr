function DailyStepsMessage( {dailyEmotion} ) {
    
    let rosaStepMessage = "";

    //const userEmo = (Object.values({dailyEmotion})[0]);

    // const userEmotion = Object.values({dailyEmotion})[0];

    const checkDailyEmotion = () => {
        console.log("checking...");
         if (dailyEmotion == 'fantastic') {
            rosaStepMessage="That's wonderful to hear! Very happy you're doing well. I'm not so bad myself. Now, how is the exercise coming along? How many steps did you reach today?";
        } else if (dailyEmotion == 'good') {
            rosaStepMessage ="It's good to be good, right? I'm not too shabby myself. How are the fitness goals going? Want to tell me how many steps you did today?";
        } else if (dailyEmotion == 'not so good') {
            rosaStepMessage = "I'm sorry to hear that. We all have down days. Hoping that tomorrow is a better one for you. Now, do you want to tell me about your steps today? Don't worry if you didn't reach your goal.";
        } else if (dailyEmotion == 'terrible') {
            rosaStepMessage = "Oh no! My apologies. Sorry that you are not feeling well. When I'm feeling down, I try to think of the little things in life that make me happy. Now, let's talk about your steps for today. How many did you take?";
        } else {
            rosaStepMessage = "Let's talk about those steps."
        }
    }


    checkDailyEmotion();

    return (
        <div>{rosaStepMessage}</div>
    )
    }

    export default DailyStepsMessage