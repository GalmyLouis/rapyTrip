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
import { map, tileLayer, marker, icon, circle } from "leaflet";

import { auth, db } from "../firebase";
import Menu from "../components/Menu";

interface IProps { }

interface IState {
	avatar: string;
	UserName: string;
}

interface IDriver {
	lat: number;
	uid: string;
	long: number;
}

class Home extends React.Component<IProps, IState> {
	mapLoaded: boolean;
	driverList: IDriver[];
	map: any;

	constructor(props: any) {
		super(props);

		this.mapLoaded = false;

		this.driverList = [];

		this.state = {
			UserName: "",
			avatar: "",
		};

		this.auth();
	}

	auth() {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				// console.log(user);
				this.setState({
					UserName: user.displayName as any,
					avatar: user.photoURL as any,
				});
			} else {
				unsub();
				location.href = "#/login";
			}
		});
	}

	loadMap() {
		var mapHTMLEL = document.querySelector("#map");

		// console.log(mapHTMLEL);

		if (!this.mapLoaded) {
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				var CarMarker = icon({
					iconUrl: "car.svg",
					iconSize: [38, 95], // size of the icon
				});

				let lat = coords.latitude;

				let long = coords.longitude;

				this.map = map("map").setView([lat, long], 15);

				circle([lat, long], {
					color: "red",
					fillColor: "#f03",
					fillOpacity: 0.5,
					radius: 5,
				}).addTo(this.map);

				tileLayer(
					"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					{
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					}
				).addTo(this.map);

				// var car = marker([coords.latitude, coords.longitude], {
				// 	icon: CarMarker,
				// }).addTo(this.map);
				// var car2 = marker([coords.latitude, coords.longitude], {
				// 	icon: CarMarker,
				// }).addTo(this.map);

				// setInterval(() => {
				// 	// lat += 0.0005;
				// 	long += 0.0005;
				// 	car2.setLatLng([lat, long]);
				// 	// car.remove()
				// }, 1000);
			});

			this.mapLoaded = true;

			this.updateDrivers();

			return "";
		}
	}

	async updateDrivers() {
		let driverList: IDriver[] = [];
		let CarMarker = icon({
			iconUrl: "car.svg",
			iconSize: [38, 95], // size of the icon
		});

		let markerList: any[] = [];

		db.collection("now").onSnapshot((docs) => {

			console.log(markerList)

			console.log("Updating Drivers positions")

			markerList.forEach(i => {
				i.remove()
			})

			markerList = []

			docs.forEach((doc) => {
				driverList.push(doc.data() as any);
			});

			driverList.forEach((driver) => {
				markerList.push(marker([driver.lat, driver.long], {
					icon: CarMarker,
				}));
			});

			driverList = [];

			markerList.forEach(i => {
				i.addTo(this.map)
			})

		});
	}

	render() {
		return (
			<>
				<Menu
					UserName={this.state.UserName}
					Avatar={this.state.avatar}
				/>

				<IonContent id="main">
					<div id="map"></div>
					{this.loadMap()}
				</IonContent>
			</>
		);
	}
}

export default Home;
