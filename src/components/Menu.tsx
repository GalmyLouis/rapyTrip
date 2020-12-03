import React from "react";
import {
	IonMenu,
	IonHeader,
	IonContent,
	IonLabel,
	IonAvatar,
	IonItem,
	IonRippleEffect,
	IonImg,
} from "@ionic/react";

interface IP {
	UserName: string | null;
	Avatar: string;
	page: "home" | "driver";
}

const GoHome: React.FC = () => {
	return (
		<IonItem
			onClick={(_) => (location.href = "#/")}
			className="ion-activatable ripple-parent"
		>
			<IonLabel>Go Back</IonLabel>
			<IonRippleEffect />
		</IonItem>
	)
}

const GoDrive: React.FC = () => {
	return (
		<IonItem
			onClick={(_) => (location.href = "#/driver")}
			className="ion-activatable ripple-parent"
		>
			<IonLabel>Become a Driver</IonLabel>
			<IonRippleEffect />
		</IonItem>
	)
}

const Menu: React.FC<IP> = (props) => {

	return (
		<>
			<IonMenu contentId="main">
				<IonHeader>
					<IonItem>
						<IonAvatar>
							<IonImg src={props.Avatar} />
						</IonAvatar>

						<IonLabel>{props.UserName}</IonLabel>
					</IonItem>
				</IonHeader>

				<IonContent>
					
				{props.page == "home"? <GoDrive /> : <GoHome />}

				</IonContent>
			</IonMenu>
		</>
	);
};

export default Menu;
