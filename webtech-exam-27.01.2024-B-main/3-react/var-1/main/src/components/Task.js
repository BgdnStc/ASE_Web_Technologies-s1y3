import { useState } from 'react'

function Task(props) {
  const [done, setDone] = useState(false);
  const toggleDone = () => setDone(!done);

  const style = {
    backgroundColor: props.item.priority === 'low' ? 'lightgreen' : 'white'
  };

  return (
    <div style={style}>
      {props.item.description} {done ? 'done' : 'not done'}
      <button onClick={toggleDone}>toggle done</button>
    </div>
  );
}

export default Task
