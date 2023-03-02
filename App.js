import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions, Image, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from './data.json';

export default function App() {

	const [setNum, setSetNum] = useState(1);
	const [exerciseIndex, setExerciseIndex] = useState(0);

	function infinite() {
		let num = []
		for (let i = 0; i <= 100; i++) {
			num[i] = i;
		}
		return num;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text
				style={[
					styles.setName,
					styles.white
			]}>Трисет</Text>

			<Text
				style={[
					styles.setNum,
					styles.white
			]}>
				{setNum}/{data.set.numberOfSets}
			</Text>
			<Text style={styles.white}>Подход</Text>

			<Text
				style={[
					styles.exerciseName,
					styles.white,
					{
						marginTop: 20
					}
			]}>{data.set.exercises[exerciseIndex].name}</Text>
			
			<FlatList
				data={data.set.exercises}
				style={{
					marginTop: 20,
				}}
				horizontal
				showsHorizontalScrollIndicator
				pagingEnabled
				initialScrollIndex={2}
				renderItem={({item}) => 
					<Image
						source={{uri: item.img}}
						style={[styles.img, {
							marginLeft: item.id === 1 ? Dimensions.get('window').width * 0.33 : 10,
							marginRight: item.id === data.set.exercises.length ? Dimensions.get('window').width * 0.33 : 10
						}]}
						borderRadius={15}
					/>}
			/>
		
			<Text
				style={[
					styles.exerciseName,
					styles.white
			]}>Укажите вес с которым вы работали</Text>
			
			<FlatList
				data={infinite()}
				style={{
					marginTop: 20,
				}}
				contentContainerStyle={{
					height: 'auto',
					paddingHorizontal: Dimensions.get('window').width * 0.45
				}}
				horizontal
				initialScrollIndex={0}
				showsHorizontalScrollIndicator
				ItemSeparatorComponent={<View style={styles.verticleLine}></View>}
				renderItem={({item}) => 
					<Text style={[styles.white, {fontSize: 30}]}>{item}</Text>}
			/>

			<Text
				style={[
					styles.exerciseName,
					styles.white
			]}>Укажите количество повторений</Text>
			
			<FlatList
				data={infinite()}
				style={{
					marginTop: 20,
				}}
				contentContainerStyle={{
					height: 'auto',
					paddingHorizontal: Dimensions.get('window').width * 0.45
				}}
				horizontal
				showsHorizontalScrollIndicator
				ItemSeparatorComponent={<View style={styles.verticleLine}></View>}
				renderItem={({item}) => 
					<Text style={[styles.white, {fontSize: 30}]}>{item}</Text>}
			/>

			<TouchableOpacity style={styles.btn}>
				<Text
					style={[
						styles.white,
						{
							color: 'black',
							fontSize: 20
					}]}>Потдвердить ({setNum} из {data.set.numberOfSets})</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	white: {
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	setName: {
		fontSize: 18,
	},
	setNum: {
		fontSize: 60
	},
	exerciseName: {
		fontSize: 20
	},
	img: {
		width: Dimensions.get('window').width * 0.3,
		height: Dimensions.get('window').height * 0.3,
	},
	btn: {
		backgroundColor: 'white',
		paddingVertical: 20,
		width: "90%",
		alignItems: 'center',
		borderRadius: 100
	},
	verticleLine: {
		height: "35%",
		width: 0.5,
		marginHorizontal: 30,
		backgroundColor: '#909090',
	}
});
