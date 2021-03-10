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
	title: {
		fontSize: 72,
		fontFamily: 'Baskerville-Italic',
		fontWeight: '300',
		color: '#fff',
		letterSpacing: 4,
	},
	loginInput: {
		width: 300,
		fontSize: 22,
		color: '#fff',
		margin: 25,
		padding: 3,
		paddingLeft: 0,
		borderColor: '#fff',
		borderBottomWidth: 1,
	},
	loginBtn: {
		backgroundColor:'#5296E7',
		borderColor: '#fff',
		borderWidth: 0,
		borderRadius: 10,
	},
	loginBtnText: {
		fontSize: 16,
		color:'#fff',
		textTransform: 'uppercase',
		padding: 8,
		letterSpacing: 2,
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
	inputField: {
		width: 300,
		fontSize: 22,
		color: '#fff',
		margin: 20,
		padding: 3,
		paddingLeft: 0,
		borderColor: '#fff',
		borderBottomWidth: 1
	},
	submitBtn: {
		backgroundColor:'#5296E7',
		borderColor: '#fff',
		borderWidth: 0,
		borderRadius: 10
	},
	submitBtnText: {
		fontSize: 16,
		color:'#fff',
		padding: 8,
		letterSpacing: 2
	},
})