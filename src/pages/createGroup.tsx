import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {View,Text, StyleSheet , ScrollView} from 'react-native';
import { BorderlessButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';
import colors from '../resources/colors'
import api from '../services/api';



export default function CreateGroup(){

    const [numeroPessoas,setNumeroPessoas] = useState('');
    const [nome,setNome] = useState('');
    const [password,setPassword] = useState('');
    const [desejo,setDesejo] = useState('');
    const [nomeGrupo,setNomeGrupo] = useState('');


    const navigation = useNavigation()

    async function handleCreateGroup(){
        let i = parseInt(numeroPessoas)

        const dataGroup = {name: nomeGrupo, password, qtdMember:i}

        
        const group = await api.post('group',dataGroup)

        const {id,name} = group.data

        const dataUser = {id, name:nome, wish: desejo, leader:true};

        const newUser = await api.post('user',dataUser)
        const {message} = newUser.data;

        if(!!!message){
            alert("Grupo cheio!")
            return 0;
        }

        if(message){
            const localData = await AsyncStorage.getItem('@userIds');
            let userIds = []
            if(localData){
                userIds = JSON.parse(localData);    
            }
            const {user} = newUser.data

            userIds.push(user.id)
            const jsonValue = JSON.stringify(userIds)
            await AsyncStorage.setItem('@userIds',jsonValue)
    
            console.log(await AsyncStorage.getItem('@userIds'))
            const params = {name,id,leader: true, wish: desejo, userName: nome}
            navigation.navigate('ViewGroup',params)
        }

       
    }

  
    return(
        <View style={styles.container}>
            <Header title={'Criar Grupo'}/>


            <ScrollView style={styles.inputContainer}>

          

            <Text style={styles.title}>Nome do Grupo: </Text>
            <TextInput
                style={styles.input}
                value={nomeGrupo}
                onChangeText={text=>setNomeGrupo(text)}

            
            /><Text style={styles.title}>Senha do Grupo: </Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text=>setPassword(text)}

            
            />
           
           <Text style={styles.title}>Quantidade de Pessoas: </Text>

            <TextInput
                style={styles.input}
                value={numeroPessoas}
                onChangeText={text=>setNumeroPessoas(text)}
                keyboardType='number-pad'
            
            />
            
            <Text style={styles.title}>Seu Nome: </Text>

            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={text=>setNome(text)}

            
            />

            <Text style={styles.title}>O que deseja ganhar: </Text>

             <TextInput
                style={styles.input}
                value={desejo}
                onChangeText={text=>setDesejo(text)}

            
            />
            
            <View style={styles.confirmContainer}>
            <TouchableOpacity onPress={handleCreateGroup}
                    style={styles.confirmButton}

                >
                    <Text style={styles.confirmButtonText}>
                        Confirmar
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}
                    style={styles.cancelButton}

                >
                    <Text style={styles.confirmButtonText}>
                        Cancelar
                    </Text>

                </TouchableOpacity>
            </View>
            
            </ScrollView>





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
        paddingHorizontal: 30,

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
        
    },

    title:{
        fontSize:18,
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

    }

})