import React from "react";
import { IonApp, IonRouterOutlet, IonRoute } from "@ionic/react";
import { Redirect } from 'react-router-dom'
import { IonReactHashRouter } from '@ionic/react-router';
import Home from "./views/Home";
import Login from "./views/Login";

const App: React.FC = () => {
	return (
		<IonApp>



			<IonReactHashRouter>

				<IonRouterOutlet />
			
				<IonRoute path="/home" exact render={p => {
					return <Home />
				}} />

				<IonRoute path="/login" exact render={p => {
					return <Login />
				}} />

				<Redirect path="/" to="home" exact />
			
			</IonReactHashRouter>

		</IonApp>
	);
};

export default App;
