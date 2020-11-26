import React from "react";
import {
	IonContent,
	IonMenu,
	IonItem,
	IonItemDivider,
	IonImg,
	IonAvatar,
	IonLabel,
} from "@ionic/react";

import './Style.css'
import 'leaflet/dist/leaflet.css';

import { map, tileLayer, marker } from 'leaflet'

interface IProps { }

interface IState {
	avatar: string;
	UserName: string
}

class Home extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			UserName: "Richard Jimenez",
			avatar: "https://thispersondoesnotexist.com/image"
		}
	}

	componentDidUpdate() {
		var Map = map('map').setView([18.4942592, -69.917081], 15);

		tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(Map);
	}

	render() {


		return (
			<>
				<IonMenu contentId="main">


					<IonItem>

						<IonAvatar>
							<IonImg src={this.state.avatar} />
						</IonAvatar>

						<IonLabel>
							{this.state.UserName}
						</IonLabel>

					</IonItem>

					<IonItemDivider />

				</IonMenu>

				<IonContent id="main">
					<div id="map">
						Soy el mapa
						<button onClick={() => this.setState({ UserName: "yolo" })}>Click me!</button>
					</div>

				</IonContent>
			</>
		);
	}
}

export default Home;
