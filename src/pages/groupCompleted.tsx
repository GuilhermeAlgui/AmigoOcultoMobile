import React, { useEffect, useState } from 'react';

import {View,Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';
import colors from '../resources/colors'
import api from '../services/api';

interface userProps{
    route: {params: {
        leader?: boolean,
        name: string,
        id: number,
        wish: string,
        userName: string,
        userId: number,
    }},
}

interface friendProps{
    id: number,
    name: string,
    wish: string,
    friend: number,
    leader: boolean,
    group_id: number,
}

export default function GroupCompleted(params: userProps){
    
    const [userId, setUserId] = useState(0);
    const [friendId,setFriendId] = useState(0);
    const [friend,setFriend] = useState<friendProps>({id:0,name: '',wish: '', friend: 0, leader: false, group_id: 0})
    const [pageinit,setPageInit] = useState(true);

    async function initPage(){
        const {userId} = params.route.params;


        const userResponse = await api.post('userId',{id: userId});

        if(userResponse){
            const userData = userResponse.data;
            const {id,friend} = userData;
            setUserId(id);
            setFriendId(friend)

            const friendResponse = await api.post('userId',{id: friend});

            if(friendResponse){
                setFriend(friendResponse.data)

            }
            

        }



    }

    function ShowFriend(){
        if(friendId!==0){

            return(<View style={styles.membroContainer}>

                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Nome: </Text>
                    <Text style={styles.itemItem}>{friend.name}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle} >Presente: </Text>
                    <Text style={styles.itemItem}>{friend.wish}</Text>
                </View>


            </View>)
        }
        return(<View></View>)


    }



    useEffect(()=>{initPage()},[])

    return(
        <View style={styles.container}>
            <Header title={'Boas Festas'}/>
            <View style={styles.completedContainer}>
            <ShowFriend/>

            
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },
    completedContainer:{
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,

    },
    membroContainer:{
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.botao,
        borderColor: '#800000',
        borderWidth: 2,
        borderRadius: 50,
        marginTop: 20,
        flexDirection: "row",

    },
    itemContainer:{
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 15,

    },
    itemTitle:{
        fontSize: 18,
        color: colors.botaoCor
    },
    itemItem:{
        fontSize: 24,
        color: colors.botaoCor

    },
})