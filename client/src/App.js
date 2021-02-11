import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import server from './services/services';

function App(){

    const [ data, setData ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newInstrument, setNewInstrument ] = useState(''); 

    useEffect(() => {
        server.get(setData);
    }, []);

    function addMusician(e){
        e.preventDefault();

        let name = newName.trim().replace(/\s+/g, " ");
        let instrument = newInstrument.trim().replace(/\s+/g, " ");


        if(name === '' || instrument === ''){
            return alert('Please fill in the both fields');
        }

        if(data.find(item => item.name.toUpperCase() === name.toUpperCase())){
            return alert('The name is already in the list');
        }

        let newObject = {
            name,
            instrument,
            id : uuid()
        }

        server.add(newObject)
        .then(response => {
            server.get(setData);
            setNewInstrument('');
            setNewName('');
        })
        .catch(error => console.log(error));
    }

    function deleteMusician(e){
        e.preventDefault();
        server.remove(e)
        .then(response => {
            server.get(setData);
        })
        .catch(error => console.log(error));
    }

    return(
        <>
            <form>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} type='text' placeholder="Enter Musician's name"/>
                <input value={newInstrument} onChange={(e) => setNewInstrument(e.target.value)} type='text' placeholder="Enter Musician's instrument"/>
                <button onClick={addMusician}>Add</button>
            </form>
            {data.map(item => <p key={item.id}>{item.name} -- {item.instrument} <button onClick={deleteMusician} id={item.id}>X</button></p>)}
        </>
    )
}

export default App;