import React, { useState } from 'react';
import L from 'leaflet';
import { IonContent } from '@ionic/react';
import Menu from '../components/Menu';
import { auth, db, fire } from '../firebase';

const uploadCoords = async (long: number, lat: number, uid: string) => {
	db.collection('history').add({
		uid: uid,
		lat: lat,
		long: long,
		timestamp: fire.firestore.Timestamp.now()
	})

	db.collection('now').doc(uid).set({
		lat: lat,
		uid: uid,
		long: long,
		timestamp: fire.firestore.Timestamp.now()
	})

}

const DriverPage: React.FC = (props) => {

	let [name, setName] = useState("");
	let [avatar, setAvatar] = useState("https://thispersondoesnotexist.com/image");
	let [mapLoaded, setMapLoad] = useState(false);

	let uid: string;

	auth.onAuthStateChanged(user => {
		if (user) {
			// console.log(user)
			setName((user.displayName as any));
			setAvatar((user.photoURL as any));

			uid = user.uid
		}
	})

	setInterval(async () => {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			uploadCoords(coords.longitude, coords.latitude, uid)
		})
	}, 1000)

	const loadMap = () => {
		var mapHTMLEL = document.querySelector("#map");

		console.log(mapHTMLEL);

		if (!mapLoaded) {
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				var CarMarker = L.icon({
					iconUrl: "car.svg",
					iconSize: [38, 95], // size of the icon
				});

				let lat = coords.latitude;

				let long = coords.longitude;

				var Map = L.map("map").setView([lat, long], 15);

				L.tileLayer(
					"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					{
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					}
				).addTo(Map);

				L.circle([lat, long], {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 5
				}).addTo(Map)

			});

			setMapLoad(true)

			return "";
		}
	}

	return (
		<>
			<Menu UserName={name} Avatar={avatar} />
			<IonContent id="main">
				<div id="map"></div>
				{loadMap()}
			</IonContent>
		</>
	)
}

export default DriverPage;