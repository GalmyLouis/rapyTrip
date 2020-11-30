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
		await auth.createUserWithEmailAndPassword(email,pwd);
		location.href = '/';
	} catch (err) {
		alert(err);
	}
};

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
