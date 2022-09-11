import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../features/messages/messageSlice'

function MessageForm() {
  const { user } = useSelector((state) => state.auth);

  const [messageData, setMessageData] = useState({ user: user, recipient: '631e401569cc45e6379d13b7', text: '' });



  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMessage({ messageData }));
  }

  return (
    <section className='form'>
    <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label htmlFor='text'>Message</label>
            <input type='text' name='text' id='text' value={messageData.text}
                onChange={(e) => setMessageData({...messageData, text: e.target.value})} />
        </div>
        <div className='form-group'>
            <button className='btn btn-block' type='submit'>
                Send Messsage
            </button>
        </div>
    </form>
</section>
  )
}

export default MessageForm