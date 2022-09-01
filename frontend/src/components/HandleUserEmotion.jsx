
function HandleUserEmotion(userEmotion, setRosaMessage) {

        if (userEmotion == "fantastic") {
            setRosaMessage(<div>I love to hear that!</div>)
    
        } else if (userEmotion == "good") {
            setRosaMessage(<div>It's good to be good, right?</div>)
    
        } else if (userEmotion == "not so good") {
            setRosaMessage(<div>I'm sorry to hear that.</div>)
    
        } else if (userEmotion == "terrible") {
            setRosaMessage(<div>Oh no! My apologies. Sorry that you are not feeling well.</div>)
    
        } else {
    
        }
    }


export default HandleUserEmotion