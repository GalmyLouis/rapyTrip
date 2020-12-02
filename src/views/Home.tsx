import React from "react";
import {
	IonContent,
	IonMenu,
	IonItem,
	IonItemDivider,
	IonImg,
	IonAvatar,
	IonLabel,
	IonMenuButton,
	IonHeader,
	IonRippleEffect,
	IonIcon,
} from "@ionic/react";

import "./Style.css";

import "leaflet/dist/leaflet.css";
import { map, tileLayer, marker, icon } from "leaflet";

import { auth } from "../firebase";
import Menu from '../components/Menu';

interface IProps { }

interface IState {
	avatar: string;
	UserName: string;
}

class Home extends React.Component<IProps, IState> {
	mapLoaded: boolean;

	constructor(props: any) {
		super(props);

		this.mapLoaded = false;

		this.state = {
			UserName: "",
			avatar: "",
		};

		this.auth();
	}

	auth() {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				this.setState({ UserName: (user.displayName as any), avatar: (user.photoURL as any) })
			} else {
				unsub();
				location.href = "#/login";
			}
		});
	}

	loadMap() {
		var mapHTMLEL = document.querySelector("#map");

		console.log(mapHTMLEL);

		if (!this.mapLoaded) {
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				var CarMarker = icon({
					iconUrl: "car.svg",
					iconSize: [38, 95], // size of the icon
				});

				let lat = coords.latitude;

				let long = coords.longitude;

				var Map = map("map").setView([lat, long], 15);

				tileLayer(
					"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					{
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					}
				).addTo(Map);

				var car = marker([coords.latitude, coords.longitude], {
					icon: CarMarker,
				}).addTo(Map);
				var car2 = marker([coords.latitude, coords.longitude], {
					icon: CarMarker,
				}).addTo(Map);

				setInterval(() => {
					// lat += 0.0005;
					long += 0.0005;
					car2.setLatLng([lat, long]);
					// car.remove()
				}, 1000);
			});

			this.mapLoaded = true;

			return "";
		}
	}

	render() {

		return (
			<>
				<Menu UserName={this.state.UserName} Avatar={this.state.avatar} />

				<IonContent id="main">
					<div id="map"></div>
					{this.loadMap()}
				</IonContent>
			</>
		);
	}
}

export default Home;
