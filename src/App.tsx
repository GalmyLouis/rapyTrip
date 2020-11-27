import React from "react";
import { IonApp, IonRouterOutlet, IonRoute } from "@ionic/react";
import { Redirect } from 'react-router-dom'
import { IonReactHashRouter } from '@ionic/react-router';
import Home from "./views/Home";

const App: React.FC = () => {
	return (
		<IonApp>



			<IonReactHashRouter>

				<IonRouterOutlet />
			
				<IonRoute path="/home" exact render={p => {
					return <Home />
				}} />

				<Redirect path="/" to="home" exact />
			
			</IonReactHashRouter>

		</IonApp>
	);
};

export default App;
