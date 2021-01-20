import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';

import colors from '../resources/colors';
import api from '../services/api';

interface ViewProps {
	route: {
		params: {
			leader?: boolean;
			name: string;
			id: number;
			wish: string;
			userName: string;
		};
	};
}

export default function ViewGroup(params: ViewProps) {
	const navigation = useNavigation();

	const [nomeGrupo, setNomeGrupo] = useState('-Nome do Grupo-');
	const [userName, setUserName] = useState('-Nome do Grupo-');
	const [wish, setWish] = useState('-Nome do Grupo-');
	const [groupId, setGroupId] = useState<number>();

	const [grupoInit, setGrupoInit] = useState(true);

	async function startGroup() {
		const data = { id: groupId };
		const response = await api.post('groupStart', data);

		if (response) {
			const userData = { id: groupId };
			const userResponse = await api.post('userStart', userData);

			if (userResponse) {
				alert(
					'Grupo iniciado com sucesso, abra o grupo novamente para saber seu amigo oculto'
				);
				navigation.goBack();
			}
		}
	}

	function initGrupo() {
		const { name, id, userName, wish } = params.route.params;
		setGroupId(id);
		setGrupoInit(false);
		setNomeGrupo(name);
		setUserName(userName);
		setWish(wish);
	}

	async function checkIfStarted() {
		const { id } = params.route.params;
		const response = await api.post('groupsId', { id: id });

		const group = response.data;

		if (group.started) {
			navigation.navigate('GroupCompleted');
		}
	}

	if (grupoInit) {
		initGrupo();
		checkIfStarted();
	}

	return (
		<View style={styles.container}>
			<Header title={`Grupo ${nomeGrupo} `} />

			<View style={styles.textContainer}>
				<Text style={styles.text}>{userName}</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{wish}</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					const params = { id: groupId };
					navigation.navigate('GroupList', params);
				}}
				style={styles.textContainer}>
				<Text style={styles.text}>Pessoas da sala</Text>
			</TouchableOpacity>

			{params.route.params.leader ? (
				<TouchableOpacity onPress={startGroup} style={styles.confirmButton}>
					<Text style={styles.confirmButtonText}>Iniciar Amigo Oculto</Text>
				</TouchableOpacity>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},

	textContainer: {
		textAlign: 'center',
		marginTop: 20,
		backgroundColor: colors.botao,
		borderRadius: 50,
		padding: 30,
	},

	confirmContainer: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	confirmButton: {
		textAlign: 'center',
		backgroundColor: '#0F0',
		borderRadius: 50,
		padding: 30,
	},

	confirmButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},
});
