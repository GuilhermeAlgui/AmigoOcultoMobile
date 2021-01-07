
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import {View,Text, StyleSheet, Dimensions} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {AntDesign} from '@expo/vector-icons';

import cores from '../resources/colors'


interface HeaderProps{
    title: string,
    showCancel?: boolean,
}



    export default function Header({title, showCancel = true}: HeaderProps){

        const navigation = useNavigation()
        function goHome(){
            navigation.navigate('Landing');
        }


        
        const style=StyleSheet.create({
            container:{
                
                padding: 24,
                backgroundColor: cores.background,
                width: Dimensions.get('window').width,
               
                paddingTop:34,
                flexDirection:'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            title:{
                color: cores.botaoCor,
                fontSize: 22,
            }
        })


        return(
            <View style= {style.container}>
                {showCancel ? ( <BorderlessButton onPress={navigation.goBack}>
                <AntDesign name="back" size={24} color="#8fa7b3" />
                </BorderlessButton>) : (<View/>)}

               
                <Text style={style.title}>
                    {title}
                </Text>


                {showCancel ? (
                  <BorderlessButton onPress= {goHome}>
                  <AntDesign name="home" size={24} color="#8fa7b3" />
              </BorderlessButton>
            ) : (<View/>)}
            </View>
        )


    }
