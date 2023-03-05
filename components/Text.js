import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Par = ({style, text}) => {
    return (
        <Text style={[
			styles.font,
            styles.white,
            style
        ]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    white: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase',
		textAlignVertical: 'center'
	},
	font: {
		fontSize: 20,
	}
})