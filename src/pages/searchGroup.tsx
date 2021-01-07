import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';

import {View,Text, StyleSheet,Image} from 'react-native';
import { BorderlessButton, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';

import colors from '../resources/colors'
import api from '../services/api';
import image from '../resources/images/spin.gif'


interface groupItem{
    id: number,
    name: string,
    code: string,
    started: boolean
}


export default function SearchGroup(){

    const [numeroPessoas,setNumeroPessoas] = useState('');
    const [codigoSala,setCodigoSala] = useState('');
    const [nome,setNome] = useState('');
    const [desejo,setDesejo] = useState('');
    const [grupos,setGrupos] = useState<groupItem[]>([])

    
    useEffect(()=>{
        api.get('/group').then(response=>{
            setGrupos(response.data)
        })

    },[])

    



    const navigation = useNavigation()

  
    return(
        <View style={styles.container}>
            <Header title={'Pesquisar Grupo'}/>


 {/**
             * 
             * Adicionar um pesquisar por nome ou codigo
             * 
             */}

            <View style={styles.inputContainer}>
            <Text style={styles.title}>Nome do Grupo: </Text>

             <TextInput
                style={styles.input}
                value={nome}
                onChangeText={text=>setNome(text)}

            
            />
            <ScrollView style={styles.scrollContainer}>
                
                
                { grupos.length >0 ?
                grupos.map(gp=>{

                    if(gp.started){
                        return
                    }
                    
                    if(gp.name.toLocaleLowerCase().includes(nome.toLocaleLowerCase())){

                        const params = {name: gp.name, id: gp.id}
                        
                        return(
                            <TouchableOpacity

                                key={gp.id}
                                style={styles.rectButton}
                                onPress={()=>{
                                    navigation.navigate('EnterGroup',params)
                                }}
                                >
                                <Text style={styles.itemName}>{gp.name}</Text>
                            </TouchableOpacity>
                        )
                    }

                })
            
                :             <Image
                                style={styles.loadingImg} 
                source={image}/>

            }
            </ScrollView>
            
            
           
               
            </View>





        </View>
    )


    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
        
    },
    inputContainer:{
        flex: 1,
    }

    ,
    input:{
        backgroundColor: '#FFF',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        marginHorizontal: 30,
        
    }, title:{
        fontSize:18,
        color: colors.botaoCor,
        marginHorizontal: 30,

    },
    scrollContainer:{
        paddingHorizontal: 10,
    },
    rectButton:{
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: colors.botao,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#e33b4b',
        padding:20,
        marginBottom: 10,
        paddingVertical: 20,

    },
    itemName:{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.botaoCor
    },
    confirmContainer:{
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    confirmButton:{
        
        textAlign: 'center',
        backgroundColor: '#0F0',
        borderRadius: 50,
        padding: 30,
        marginTop: 20,
    },
    cancelButton:{
        textAlign: 'center',
        backgroundColor: '#F00',
        borderRadius: 50,
        padding: 30,
        
    },
    confirmButtonText:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center'

    },
    loadingImg:{
        width: 75,
        height: 75,
        alignSelf: 'center'
    }

})