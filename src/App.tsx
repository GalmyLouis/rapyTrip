import React from "react";
import { IonApp } from "@ionic/react";
import Home from "./views/Home";

const App: React.FC = () => {
	return (
		<IonApp>
			<Home />
		</IonApp>
	);
};

export default App;
