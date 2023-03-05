import { Par } from './Text';
import React, { forwardRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const Carousel = forwardRef((props, ref) => {

	const handleScrollFailed = (ref, index) => {
		const wait = new Promise(resolve => setTimeout(resolve, 100));
		wait.then(() => {
			props.handleRef(ref, index);
		});
	}

	const updateVal = (index) => {
		props.setFunc(index);
		props.handleRef(ref, index);
	}

	const Divider = ({style}) => {
		return <View style={[styles.verticleLine, style]}></View>
	}
	
	const onScroll = (event) => {
		const newVal = Math.round(event.nativeEvent.contentOffset.x / props.size);
		updateVal(newVal);
	}

	const Img = ({item, index}) => {
		return <Image
			source={{uri: item.img}}
			style={[
				styles.img,
				{
					opacity: index === props.initInd ? 1 : 0.3,
					marginLeft: index ? 20 : screenWidth * 0.35,
					marginRight: index === props.data.length - 1 ? screenWidth * 0.35 : 20
				}
			]}
			borderRadius={15}
		/>
	}

	const Number = ({item, index}) => {
		return <> 
			{index === 0 && <Divider style={styles.dividerLeft}/>}
			<Par
				text={item}
				style={[
					styles.number,
					{ fontSize: item === props.initInd ? 80 : 30}
				]}
			/>
			{index === 50 && <Divider style={styles.dividerRight}/>}
		</>
	}

	const Render = ({item, index}) => {
		return <TouchableOpacity
			style={styles.row}
			onPress={() => updateVal(index)}
		>
			{props.child === 0
				? <Img item={item} index={index}/>
				: <Number item={item} index={index}/>}
		</TouchableOpacity>
	}

	return (
		<View>
			<Par style={props.titleStyle} text={props.title}/>
			<FlatList
				ref={ref}
				horizontal
				style={styles.grow}
				data={props.data}
				initialScrollIndex={props.initInd}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				onScrollToIndexFailed={info => handleScrollFailed(ref, info.index)}
				ItemSeparatorComponent={props.child ? <Divider/> : <></>}
				onMomentumScrollEnd={(event) => onScroll(event)}
				renderItem={({item, index}) => <Render item={item} index={index} />}
			/>
		</View>
	)
})

const styles = StyleSheet.create({
	img: {
		width: screenWidth * 0.3,
		height: screenHeight * 0.3,
		marginHorizontal: screenWidth * 0.05
	},
	verticleLine: {
		height: 40,
		width: 0.5,
		alignSelf: 'center',
		backgroundColor: 'grey'
	},
	number: {
		width: screenWidth * 0.2,
		marginHorizontal: 10,
	},
	row: {
		flexDirection: 'row'
	},
	grow: {
		flexGrow: 0
	},
	dividerLeft: {
		marginLeft: screenWidth * 0.43
	},
	dividerRight: {
		marginRight: screenWidth * 0.37
	},
});

export default Carousel;