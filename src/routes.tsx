import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Landing from './pages/landing';
import CheckGroupList from './pages/checkGroupList';
import CreateGroup from './pages/createGroup';
import GroupCompleted from './pages/groupCompleted';
import GroupList from './pages/groupList';
import SearchGroup from './pages/searchGroup';
import ViewGroup from './pages/viewGroup';
import EnterGroup from './pages/enterGroup';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerStyle: { backgroundColor: '#9F0000' },
					headerTitleStyle: { color: '#FFF' },
					headerShown: false,
				}}>
				<Screen name='Landing' component={Landing} />
				<Screen name='CheckGroupList' component={CheckGroupList} />
				<Screen name='CreateGroup' component={CreateGroup} />
				<Screen name='GroupCompleted' component={GroupCompleted} />
				<Screen name='GroupList' component={GroupList} />
				<Screen name='SearchGroup' component={SearchGroup} />
				<Screen name='ViewGroup' component={ViewGroup} />
				<Screen name='EnterGroup' component={EnterGroup} />
			</Navigator>
		</NavigationContainer>
	);
}
