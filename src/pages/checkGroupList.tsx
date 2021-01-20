import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../resources/colors';
import api from '../services/api';
import Header from '../components/header';
import image from '../resources/images/spin.gif';

interface GroupProps {
	code: string;
	id: number;
	name: string;
	started: boolean;
	password: string;
}
interface UserProps {
	id: number;
	name: string;
	wish: string;
	group_id: number;
	leader: boolean;
}

export default function CheckGroupList() {
	const navigation = useNavigation();
	const [loadGroups, setLoadGroups] = useState(true);
	const [group, setGroup] = useState<GroupProps[]>([]);
	const [users, setUsers] = useState<UserProps[]>([]);

	async function listIds() {
		try {
			const localData = await AsyncStorage.getItem('@userIds');
			let idGroup = [];
			if (localData) {
				idGroup = JSON.parse(localData);
			} else {
				alert('Não está participando de nenhuma sala');
				navigation.goBack();
			}
			const data = { idGroup };
			try {
				const response = await api.post('/multiUsers', data);

				const { groupList } = response.data;
				setGroup(groupList);
				const { userList } = response.data;
				setUsers(userList);
			} catch (error) {
				alert('Ero!');
			}
		} catch (error) {
			alert('Erro!');
		}
	}

	if (loadGroups) {
		listIds();
		setLoadGroups(false);
	}

	async function handleNextScreen() {}

	return (
		<View style={{ flex: 1 }}>
			<Header title='Suas salas' />
			<View style={styles.container}>
				<ScrollView style={styles.scrollContainer}>
					{group.length > 0 ? (
						users.map((us) => {
							let groups = { id: 0, name: '', started: false, password: '' };
							for (let i = 0; i < group.length; i++) {
								if (group[i].id === us.group_id) {
									groups = group[i];
								}
							}

							if (groups.id !== 0) {
								return (
									<TouchableOpacity
										onPress={() => {
											const params = {
												id: groups.id,
												name: groups.name,
												leader: us.leader,
												wish: us.wish,
												userName: us.name,
												userId: us.id,
											};

											if (groups.started) {
												navigation.navigate('GroupCompleted', params);
											} else {
												navigation.navigate('ViewGroup', params);
											}
										}}
										style={styles.rectButton}
										key={`${groups.id}${us.group_id}${us.id}`}>
										<Text style={styles.itemCode}>{groups.name}</Text>
										<Text style={styles.itemName}>{us.name}</Text>
										<Text style={styles.itemName}>{us.wish}</Text>
									</TouchableOpacity>
								);
							}
						})
					) : (
						<Image style={styles.loadingImg} source={image} />
					)}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContainer: {
		paddingHorizontal: 10,
	},
	rectButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.botao,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: '#e33b4b',
		padding: 20,
		marginBottom: 10,
		paddingVertical: 20,
	},
	buttonText: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},

	itemContainer: {
		backgroundColor: '#63CC77',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		padding: 20,
	},
	itemCode: {
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},
	itemName: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},
	itemWish: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.botaoCor,
	},
	loadingImg: {
		width: 75,
		height: 75,
		alignSelf: 'center',
	},
});
