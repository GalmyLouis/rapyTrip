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

async function Login(email: string, pwd: string) {
	try {
		await auth.signInWithEmailAndPassword(email, pwd);
		location.href = '/';
	}
	catch (err) {
		alert(err)
	}
}

const SignUp = async (email: string, pwd: string) => {
	try {
		await auth.createUserWithEmailAndPassword(email, pwd);
		location.href = '/';
	} catch (err) {
		alert(err);
	}
};

const GoogleLogin = async () => {
	try {
		const GooglePlusCred = await GooglePlus.login({
			'scopes': 'profile email ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
			'webClientId': '852496412611-8829539eehfnhddlf7pq54bt345l0a9k.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
			'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
		});

		console.log(GooglePlusCred);
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

	return (
		<IonContent>
			<div id="loginBox">
				<div>
					<IonItem>
						<IonLabel position="floating">Email:</IonLabel>
						<IonInput
							onKeyUp={(p) => setEmail((p.target as any).value)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position="floating">Password</IonLabel>
						<IonInput
							type="password"
							onKeyUp={(p) => setPwd((p.target as any).value)}
						/>
					</IonItem>
					<IonButton color="primary" onClick={() => Login(email, pwd)}>Login</IonButton>
					<IonButton
						color="danger"
						onClick={() => SignUp(email, pwd)}
					>
						Sign Up
					</IonButton>
				</div>
			</div>
		</IonContent>
	);
};

export default LoginForm;
