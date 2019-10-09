import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet, Platform, StatusBar } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
	const [techs, setTechs] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://192.168.25.128:3333', {
				query: { user_id}
			})

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} na data ${booking.date} foi ${booking.approved ? 'Aprovada': 'Recusada'}`)
			})
		});
	}, []);
	
	useEffect(() => {
		AsyncStorage.getItem('techs').then(storagedTechs => {
			const techsArray = storagedTechs.split(',')
				.map(tech => tech.trim());

			setTechs(techsArray);
		});
	}, []);

	return (
	<SafeAreaView style={styles.container}>
		<ScrollView style={styles.spotList}>
			<Image style={styles.logo} source={logo}></Image>
			{techs.map((tech, index) => <SpotList key={index} tech={tech}/>)}
		</ScrollView>
	</SafeAreaView>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 0
	},

	spotList: {
		marginBottom: 50
	},

	logo: {
		height: 32,
		resizeMode: "contain",
		alignSelf: "center",
		paddingBottom: 20
	},
})