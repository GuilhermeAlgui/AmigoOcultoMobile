import React, { useEffect, useState } from 'react';

import {View,Text, StyleSheet, Image , Animated,Easing} from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import cores from '../resources/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontAwesome} from '@expo/vector-icons'

import image from '../resources/images/spin.gif'


export default function Landing(){

    const navigation = useNavigation();

    const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      useEffect(() => {
        Animated.loop(
          Animated.timing(spinAnim, {
            toValue: 3,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ).start();
      });

    async function resetStorage(){
        await AsyncStorage.clear();
        /**
         * const localData = await AsyncStorage.getItem('@userIds');
        let userIds = []
        if(localData){
            userIds = JSON.parse(localData);    
        }
        let userIds2=[]

        for(let i =0; i<userIds.length; i++){
            if(userIds[i]!== null){
                userIds2.push(userIds[i])
            }
        }
        console.log(userIds2)
        const jsonValue = JSON.stringify(userIds2)
        await AsyncStorage.setItem('@userIds',jsonValue) 

         * 
         * */
        

    }


    return(
        <View style= {styles.container}>
            <StatusBar translucent style={'light'}/>
            <Header title={'Amigo Oculto'} showCancel={false} />
            
            <ScrollView style={styles.landingContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('CreateGroup')}} style= {styles.rectButton}>
                    <Text style={styles.buttonText}>Criar Sala</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('SearchGroup')}} style= {styles.rectButton}>
                    <Text style={styles.buttonText}>Entrar em Sala</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('CheckGroupList')}} style= {styles.rectButton}>
                    <Text style={styles.buttonText}>Minhas salas</Text>
                </TouchableOpacity>
            </ScrollView>

           

            
         
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: cores.background,
        justifyContent: 'flex-start',
        
        
    },
    landingContainer:{
        paddingHorizontal: 25,

    },
    
    rectButton:{
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: cores.botao,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#e33b4b',
        padding: 40,
        marginTop: 10,
        paddingVertical: 35,

    },
    buttonText:{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: cores.botaoCor
    }

})