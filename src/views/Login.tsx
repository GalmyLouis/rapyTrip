import React, { useRef, useState } from "react";
import { auth, fire } from "../firebase";
import {
	IonContent,
	IonButton,
	isPlatform,
	IonItem,
	IonInput,
	IonLabel,
} from "@ionic/react";
import { GooglePlus } from "@ionic-native/google-plus";
import "./Style.css";

// async function Login(email: string, pwd: string) {
// 	try {
// 		await auth.signInWithEmailAndPassword(email, pwd);
// 		location.href = '/';
// 	}
// 	catch (err) {
// 		alert(err)
// 	}
// }

// const SignUp = async (email: string, pwd: string) => {
// 	try {
// 		await auth.createUserWithEmailAndPassword(email, pwd);
// 		location.href = '/';
// 	} catch (err) {
// 		alert(err);
// 	}
// };

const login = async () => {

	try {
		const GoogleProv = new fire.auth.GoogleAuthProvider();
		await auth.signInWithPopup(GoogleProv);
		location.href = '#/home';
	} catch (err) {
		alert(err)
	}
}

const GoogleLogin = async () => {
	try {
		const GooglePlusIdToken = await GooglePlus.login({
			'scopes': 'profile email ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
			'webClientId': '852496412611-8829539eehfnhddlf7pq54bt345l0a9k.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
			'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
		});

		console.log(GooglePlusIdToken);

		await auth.signInWithCredential(fire.auth.GoogleAuthProvider.credential(GooglePlusIdToken.idToken))

		location.href = '#/home';
	}
	catch (err) {
		alert("Error at Login")
		alert(err)
	}
}

(window as any).login = GoogleLogin;


const LoginForm: React.FC = (props) => {
	let [email, setEmail] = useState("");

	let [pwd, setPwd] = useState("");

	if (isPlatform('mobile')) {
		GoogleLogin();
	}

	return (
		<IonContent>
			<div id="loginBox">
				<div>
					<IonButton color="danger" onClick={() => login()}>
						Login
					</IonButton>
				</div>
			</div>
		</IonContent>
	);
};

export default LoginForm;
