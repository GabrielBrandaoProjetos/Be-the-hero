import React, {useEffect, useState} from 'react'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Casos(){
    const [total, setTotal] = useState(0)
    const [casos, setCasos] = useState([])

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigationToDetail(caso){
        navigation.navigate('Detalhes', {caso})
    }

    async function loadCasos(){
        if (loading){
            return;
        }

        if (total > 0 && casos.length == total){

        }

        setLoading(true)
        const response = await api.get(`casos?page=${page}`)
        setCasos([...casos, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }
    useEffect(() => {
        loadCasos();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList
                style={styles.casosLista}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.1}
                renderItem={({item: caso}) => (
                    <View style={styles.casos}>
                        <Text style={styles.casoProperty}>ONG:</Text>
                        <Text style={styles.casoValor}>{caso.nome}</Text>

                        <Text style={styles.casoProperty}>CASO:</Text>
                        <Text style={styles.casoValor}>{caso.titulo}</Text>
                        
                        <Text style={styles.casoProperty}>VALOR:</Text>
                        <Text style={styles.casoValor}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigationToDetail(caso)}
                        >

                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#e02041'> </Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}