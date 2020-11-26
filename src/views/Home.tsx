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

import "./Style.css";

import "leaflet/dist/leaflet.css";
import { map, tileLayer, marker, icon } from "leaflet";

interface IProps { }

interface IState {
	avatar: string;
	UserName: string;
}

class Home extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.state = {
			UserName: "Richard Jimenez",
			avatar: "https://thispersondoesnotexist.com/image",
		};
	}

	loadMap() {

		var coords: any;

		navigator.geolocation.getCurrentPosition(({ coords }) => {
			
			var CarMarker = icon({
				iconUrl: 'car.svg',
				iconSize: [38, 95], // size of the icon
			})


			let lat = coords.latitude;

			let long = coords.longitude;

			var Map = map("map").setView([lat, long], 15);

			tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(Map);

			var car = marker([coords.latitude, coords.longitude], { icon: CarMarker }).addTo(Map)
			var car2 = marker([coords.latitude, coords.longitude], { icon: CarMarker }).addTo(Map)

			setInterval(() => {
				// lat += 0.0005;
				long += 0.0005;
				car2.setLatLng([lat, long])
				// car.remove()
			}, 1000)
		})
	}

	render() {
		setTimeout(this.loadMap, 500);

		return (
			<>
				<IonMenu contentId="main">
					<IonItem>
						<IonAvatar>
							<IonImg src={this.state.avatar} />
						</IonAvatar>

						<IonLabel>{this.state.UserName}</IonLabel>
					</IonItem>

					<IonItemDivider />
				</IonMenu>

				<IonContent id="main">
					<div id="map"></div>
				</IonContent>
			</>
		);
	}
}

export default Home;
