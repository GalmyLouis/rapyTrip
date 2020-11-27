import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
	apiKey: "AIzaSyBAIh8KG1r9jRfysKZ-uirLqccvtuLBiH4",
	authDomain: "rapytrip.firebaseapp.com",
	databaseURL: "https://rapytrip.firebaseio.com",
	projectId: "rapytrip",
	storageBucket: "rapytrip.appspot.com",
	messagingSenderId: "852496412611",
	appId: "1:852496412611:web:e63fae35f653f73dc2d776",
	measurementId: "G-21S0R8QTFL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const fire 	= firebase;
export const db 	= firebase.firestore();
export const auth 	= firebase.auth()