import React from 'react'
import {Feather} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import {View, ScrollView, Image, Text, TouchableOpacity, Linking} from 'react-native'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Detalhes(){
    const route = useRoute()
    const navigation = useNavigation()

    const caso = route.params.caso;
    const message = `
        Olha ${caso.nome} estou entrando em contacto pois gostaria de ajudar no caso ${caso.titulo}, 
        com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
    `
    
    function navigationGoBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Caso: ${caso.titulo}`,
            recipients: [caso.email],
            body: message,
        })

    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`)
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationGoBack}>
                    <Feather name='arrow-left' size={28} color='#e02041'> </Feather>
                </TouchableOpacity>    
            </View>
            
            <View style={styles.caso}>
                <Text style={styles.casoProperty}>ONG:</Text>
                <Text style={styles.casoValor}>{caso.nome}</Text>

                <Text style={styles.casoProperty}>CASO:</Text>
                <Text style={styles.casoValor}>{caso.titulo}</Text>

                <Text style={styles.casoProperty}>Descrição:</Text>
                <Text style={styles.casoValor}>{caso.descricao}</Text>
                
                <Text style={styles.casoProperty}>VALOR:</Text>
                <Text style={[styles.casoValor, {marginBottom: 0}]}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}</Text>    
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactBoxText}>Salve o dia!</Text>
                <Text style={styles.contactBoxText}>Seja o herói desse caso.</Text>
                <Text style={styles.contactBoxDescription}>Entre em contato:</Text>
                <View style={styles.contactActions}>
                    <TouchableOpacity style={styles.contactAction} onPress={sendWhatsApp}><Text style={styles.contactActionText}>WhatsApp</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.contactAction} onPress={sendMail}><Text style={styles.contactActionText}>E-mail</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}