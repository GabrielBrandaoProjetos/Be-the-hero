import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn, FiEye, FiEyeOff} from 'react-icons/fi'
import api from '../../services/api.js'
import './styles.css'

import heroImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('')
    const [typePassword, setTypePassword] = useState("password")
    const history = useHistory()

    async function handleLogon(e){
        e.preventDefault();
        
        try {
                                            //api.post recebe a rota 'session' e o elemento id  
            const response = await api.post('session', {id})
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongnome', response.data.nome)

            history.push('/profile')
        } catch (error) {
            alert("Falha no login tente novamente")
        }
    }

    function toggleTypePassword(){
        setTypePassword(typePassword === "password" ? "text" : "password")
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <div>
                        <input 
                            type={typePassword}
                            placeholder="Seu ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        {typePassword === 'password' ? (
                            <FiEyeOff onClick={toggleTypePassword}/>
                        ) : (
                            <FiEye onClick={toggleTypePassword}/>
                        )}
                        
                    </div>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho registro
                    </Link>
                </form>
            </section>

            <img src={heroImg} alt="Heroes" />
        </div>
    )        
}