import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		height: "100%",
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#000"
	},
	safeArea: {
		backgroundColor: "#fff"
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
		margin: '5%',
	},
	btnText: {
		fontSize: 14,
		color:'#fff',
		padding: 8,
		letterSpacing: 1.5,
	},
	inputField: {
		width: 300,
		fontSize: 22,
		color: '#fff',
		margin: 20,
		padding: 3,
		paddingLeft: 0,
		borderColor: '#fff',
		borderBottomWidth: 1
	}
})