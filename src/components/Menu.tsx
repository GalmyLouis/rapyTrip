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
					<IonItem
						onClick={(_) => (location.href = "#/driver")}
						className="ion-activatable ripple-parent"
					>
						<IonLabel>Become a Driver</IonLabel>
						<IonRippleEffect />
					</IonItem>
				</IonContent>
			</IonMenu>
		</>
	);
};

export default Menu;
