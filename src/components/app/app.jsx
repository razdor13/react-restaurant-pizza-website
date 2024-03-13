import '../app/app.scss'
import usePizzaService from '../../services/PizzaService'
import { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header.jsx';
const App = () => {

    const {loading,error,getHelloWorld} = usePizzaService();
    const [message, setMessage]= useState()
    
    useEffect(()=> {
        // onRequest()
        
    },[])
    
    const onRequest = () => {
        getHelloWorld()
        .then(res => setMessage(()=> res.message))
    };
    
    return (
        
            <Header/>
        
    )
}


export default App