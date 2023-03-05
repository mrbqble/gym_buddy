import data from './data.json';
import { Par } from './components/Text';
import { Carousel } from './components/Carousel';
import { useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, TouchableOpacity, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function App() {

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const [setNum, setSetNum] = useState(1);
	const [currInd, setCurrInd] = useState(0);
	const [currReps, setCurrReps] = useState(0);
	const [currWeight, setCurrWeight] = useState(0);

	const infinite = () => {
		let num = []
		for (let i = 0; i <= 50; i++)
			num[i] = i;
		return num;
	}

	const handleRef = (ref, index) => {
		ref.current?.scrollToIndex({
			index,
			animated: true,
			viewPosition: 0.5,
			viewOffset: screenWidth * (index === 0 && ref !== ref1 ? -0.05 : 0)
		})
	}

	useEffect(() => {
		data.set.exercises[currInd].records[setNum - 1].weight = currWeight;
	}, [currWeight])

	useEffect(() => {
		data.set.exercises[currInd].records[setNum - 1].reps = currReps;
	}, [currReps])
	
	const handleConfirm = () => {
		if (setNum < data.set.numberOfSets) {
			setCurrInd(0);
			setSetNum(setNum + 1);
		}
	}
	
	useEffect(() => {
		const newReps = data.set.exercises[currInd].records[setNum - 1].reps;
		const newWeight = data.set.exercises[currInd].records[setNum - 1].weight;
		setCurrReps(newReps);
		setCurrWeight(newWeight);
		handleRef(ref1, currInd);
		handleRef(ref3, newReps);
		handleRef(ref2, newWeight);
	}, [currInd, setNum])
	
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Par text='Трисет'/>
				<Par
					style={styles.setNum}
					text={`${setNum}/${data.set.numberOfSets}`}/>
				<Par text='Подход'/>
			</View>
			<Carousel
				child={0}
				ref={ref1}
				initInd={currInd}
				setFunc={setCurrInd}
				handleRef={handleRef}
				data={data.set.exercises}
				size={screenWidth * 0.3 + 40}
				titleStyle={{ marginBottom: 20 }}
				title={data.set.exercises[currInd].name}
			/>
			<Carousel
				child={1}
				ref={ref2}
				offSet={-0.05}
				data={infinite()}
				initInd={currWeight}
				handleRef={handleRef}
				setFunc={setCurrWeight}
				size={screenWidth * 0.2 + 20}
				title="Укажите вес с которым вы работали"
			/>
			<Carousel
				child={1}
				ref={ref3}
				offSet={-0.05}
				data={infinite()}
				initInd={currReps}
				handleRef={handleRef}
				setFunc={setCurrReps}
				size={screenWidth * 0.2 + 20}
				title="Укажите количество повторений"
			/>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => handleConfirm()}
			>
				<Par
					style={styles.black}
					text={`Потдвердить (${setNum} из ${data.set.numberOfSets})`}/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black',
		justifyContent: 'space-around',
	},
	setNum: {
		fontSize: 60
	},
	btn: {
		width: "90%",
		borderRadius: 100,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	black: {
		color: "black"
	}
});

