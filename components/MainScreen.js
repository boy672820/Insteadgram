import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import GiftTab from './AppTabNavigator/GiftTab';

const AppTabNavigator = createMaterialTopTabNavigator(
	{
		HomeTab: { screen: HomeTab },
		SearchTab: { screen: SearchTab },
		AddMediaTab: { screen: AddMediaTab },
		LikesTab: { screen: LikesTab },
		ProfileTab: { screen: ProfileTab },
		GiftTab: { screen: GiftTab },
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			style: {
				backgroundColor: 'white'
			},
			iconStyle: {
				...Platform.select( {
					height: 35,
					marginBottom: 20
				} )
			},
			activeTintColor: '#000',
			inactiveTintColor: '#d1cece',
			upperCaseLabel: false,
			showLabel: false,
			showIcon: true,
		}
	}
);

const AppTabContainer = createAppContainer( AppTabNavigator );

export default class MainScreen extends Component {

	// Add code to navigationOptions
	static navigationOptions = {
		header: null
	};

	render() {
		return <AppTabContainer />;
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
} );
