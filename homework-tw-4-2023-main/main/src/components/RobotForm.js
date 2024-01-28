import React, { useState } from 'react'

function RobotForm(props) {
    const [name, setName] = useState([]);
    const [type, setType] = useState([]);
    const [mass, setMass] = useState([]);

    const handleClick = () => {
        const massValue = mass < 500 ? '' : mass;
        props.onAdd({ type, name, mass: massValue });
        setName('');
        setType('');
        setMass('');
    };

    return (
        <div className='robotForm'>
            <h1>Add new robot</h1>
            <input
                placeholder='name'
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder='type'
                type='text'
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                placeholder='mass'
                type='text'
                id='mass'
                value={mass}
                onChange={(e) => setMass(e.target.value)}
            />

            <button id='add' onClick={handleClick}>
                add
            </button>
        </div>
    );

}

export default RobotForm