import { useEffect, useState } from "react";
import TwitchIcon from "../../../assets/images/twitch-icon.png";
import CloseIcon from "../../../assets/images/close_icon.png";

const TwitchModalButton = () => {
    const [isModalActive, setIsModalActive] = useState(true);

    useEffect(() => {
        // let embed;
        // let EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';
        // // https://www.twitch.tv/popout/pixelwaresd/chat

        // const script = document.createElement('script');
        // script.setAttribute(
        //   'src',
        //   EMBED_URL
        // );
        // script.addEventListener('load', () => {
        //   embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
        // });
        //     document.body.appendChild(script);
    }, [])

    return ( 
        <div>
            {!isModalActive ? (
                <div
                    className="action-menus__menu__item"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                    }}
                >
                    <img
                        src={TwitchIcon}
                        onClick={() => setIsModalActive(true)}
                    />
                </div>
            ) : (
                <div
                    className="action-menus__menu__item"
                    onClick={() => setIsModalActive(false)}
                    style={{
                        zIndex: 12,
                        position: "fixed",
                        top: "10px",
                        right: "10px",
                    }}
                >
                    <img src={CloseIcon} alt="" className="menu" />
                </div>
            )}

            {isModalActive && (
                <div className="modal"
                    style={{
                        position: "fixed",
                        top: "0",
                        right: "0",
                        width: "20%",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 10
                    }}
                >
                    <iframe src="https://www.twitch.tv/embed/pixelwaresd/chat?parent=pixel-war-app.vercel.app"
                        height="300px"
                        width="300px">
                    </iframe>
                    {/* <iframe src="https://www.twitch.tv/embed/pixelwaresd/chat?parent=localhost"
                        height="100%"
                        width="100%"
                        style={{
                            opacity: ".9",
                            border: "none",
                        }}
                    >
                    </iframe> */}
                </div>
            )}
        </div>
     );
}
 
export default TwitchModalButton;