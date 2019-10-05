import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import api from '../services/api';
import { withNavigation } from 'react-navigation';

function SpotList({ tech, navigation }) {
	const [spots, setSpots] = useState([]);

	useEffect(() => {
		async function loadSpots() {
			const response = await api.get('/spots', {
				params: { tech }
			});
			setSpots(response.data);
			response.data.map((item) =>{
				console.log(item.thumbnail_url)
			})
		}
		loadSpots();
	}, []);

	function handleNavigation (id) {
		navigation.navigate('Book', { id })
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Empresas que usam 
				<Text style={styles.bold}> {tech}</Text>
			</Text>
			<FlatList style={styles.list}
					  data={spots}
					  keyExtractor={spot => spot._id}
					  horizontal
					  showsHorizontalScrollIndicator={false}
					  renderItem={({ item }) => (
						  <View style={styles.listItem}>
							  <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}}></Image>
							  <Text style={styles.company}>{item.company}</Text>
							  <Text style={styles.price}>{item.price ? `R$${item.price}/dia`: 'Gratuito'}</Text>
							  <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
							  	<Text style={styles.buttonText}>Solicitar Reserva</Text>
							  </TouchableOpacity>
						  </View>
					  )}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listItem: {
		marginRight: 15,
	},

	thumbnail: {
		width: 200,
		height: 120,
		resizeMode: 'cover',
		borderRadius: 2
	},

	container: {
		marginTop: 30
	},

	title: {
		fontSize: 20,
		color: '#444',
		paddingHorizontal: 20,
		marginBottom: 14	
	},

	company: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10
	},
	
	color: {
		fontSize: 15,
		color: '#999',
		marginTop: 5
	},

	bold: {
		fontWeight: 'bold'
	},

	list: {
		paddingHorizontal: 20
	},

	button: {
		height: 32,
		backgroundColor: "#f05a5b",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 2,
		marginTop: 15
	},

	buttonText: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 15
	}

})

export default withNavigation(SpotList);