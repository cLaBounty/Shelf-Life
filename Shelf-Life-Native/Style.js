import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	menucontainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnImage: {
		width: 100,
		height: 100,
	},
	background: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		position: 'absolute',
		opacity: 0.50,
	},
	text: {
		fontSize: 24,
		color: '#fff',
		margin: 10,
	},
	btn: {
		alignItems: 'center',
		backgroundColor:'#78BB31',
		borderColor: '#fff',
		borderWidth: 0,
		borderRadius: 10,
		margin: 5,
	},
	btnText: {
		fontSize: 14,
		color:'#fff',
		padding: 8,
		letterSpacing: 1.5,
	},
})