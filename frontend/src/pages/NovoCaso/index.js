import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api.js'
import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function NovoCaso(){
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState()

    //const history = useHistory()

    const ongid = localStorage.getItem('ongId')

    async function handleNovoCaso(e){
        e.preventDefault();
        const data = {
            titulo,
            descricao,
            valor,
        }
        try {
            await api.post('casos', data , {
                headers:{
                    authorization: ongid,
                }
            })
            setTitulo('')
            setDescricao('')
            setValor('')
        } catch (error) {
            alert('Erro ao cadastrar novo caso, tente novamente.')
        }
    }

    function cancelar(e){
        e.preventDefault();
        setTitulo('')
        setDescricao('')
        setValor('')
    }

    return(
        <div className="novocaso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva um caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to='/profile'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNovoCaso}>
                    <input 
                        placeholder="Títilo do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}    
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} 
                    ></textarea>
                    <input 
                        type="number" placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />
                    <div className="input-group">
                        <input id="button" onClick={cancelar} type="submit" value="Cancelar" style={{width: 240}}/>
                        <input className="button" type="submit" value="Cadastrar"/>
                    </div>    
                </form>
            </div>
        </div>
    )
}