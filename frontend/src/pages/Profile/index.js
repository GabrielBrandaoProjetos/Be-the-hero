import React, {useState ,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api.js'
import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const [casos, setCasos] = useState([])

    const history = useHistory()

    const ongid = localStorage.getItem('ongId')
    const ongnome = localStorage.getItem('ongnome')
    console.log(ongid)

    useEffect(() => {
        api.get('profile', {
            headers:{
                authorization: ongid,
            }
        }).then(Response =>{
            setCasos(Response.data)
        })
    } , [ongid])

    async function handleDeleteCaso(id){
        try {
            await api.delete(`/casos/${id}`, {
                headers:{
                    authorization: ongid,
                }
            });
            setCasos(casos.filter(caso => caso.id !== id))
        } catch (error) {
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda, {ongnome}</span>
                <Link className="button" to="/casos/novo">Cadastrar</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso =>(
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo} </p>
                        <strong>Descrição</strong>
                        <p>{caso.descricao}</p>
                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>
                        <button onClick={() => handleDeleteCaso(caso.id)} type="button"> <FiTrash2/> </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}