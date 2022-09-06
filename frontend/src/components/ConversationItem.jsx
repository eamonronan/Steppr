import React from 'react'

function ConversationItem({ conversation }) {
    return (
        <>
            <div>Conversation</div>
            <div>
                {new Date(conversation.createdAt).toLocaleString('en-US')}
            </div>
            <h4>{conversation.feeling}</h4>
            <h4>{conversation.stepCount}</h4>
            <h4>{conversation.primaryGoalRating}</h4>
            <h4>{conversation.secondaryGoalRating}</h4>

        </>

    )
}

export default ConversationItem