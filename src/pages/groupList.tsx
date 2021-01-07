import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {View,Text,StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';
import colors from '../resources/colors'
import api from '../services/api';

interface MembroProps{
    nome: string,
    desejo: string,

}

interface propParams{
    route: {params:{
        id: number

    }}
}
interface  grupoProps{
    group_id: number,
    id: number,
    name: string,
    wish: string,
}

export default function GroupList(params: propParams){
    const [qtdMembros,setQtdMembros] =useState(0);
    const navigation = useNavigation();
    const [groupId,setGroupId] = useState<number>()
    const [group,setGroup] = useState<grupoProps[]>([])

    const [grupoInit,setGrupoInit] = useState(true);


    async function initGrupo(){
        const {id} = params.route.params;
        const data = {id}

        const response = await api.post('/indexByGroup',data)

        const users = response.data
        setGroup(users);
        setGrupoInit(false)

    }

    if(grupoInit){
        initGrupo()
    }

    

    function Membros({nome,desejo}: MembroProps){
        


        return(
            <TouchableOpacity
                onPress={()=>{}}
            style={styles.membroContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Nome:</Text>
                    <Text style={styles.itemItem}>{nome}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Desejo:</Text>
                    <Text style={styles.itemItem}>{desejo}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return(
        <View style={styles.container}>
            <Header title={'Membros do Grupo'}/>
            <ScrollView style={styles.groupContainer}>
                <Text style={styles.qtdMmebros}>Quantidade de Membros no Grupo: {qtdMembros}</Text>
                {group.map(gp=>(
                    <Membros key={gp.id} nome={gp.name} desejo={gp.wish} />
                ))}

                




            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    groupContainer:{
        backgroundColor: colors.background,
        paddingHorizontal: 25,
    },
    qtdMmebros:{
        fontSize: 18,
        color: '#000',
        textAlign: "center",
        marginTop: 10,
    },
    membroContainer:{
        padding: 20,
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
        fontSize: 12,
        color: colors.botaoCor
    },
    itemItem:{
        fontSize: 20,
        color: colors.botaoCor

    }

})