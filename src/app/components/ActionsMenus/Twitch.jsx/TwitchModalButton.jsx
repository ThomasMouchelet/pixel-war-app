import { useEffect, useState } from "react";

const TwitchModalButton = () => {
    const [isModalActive, setIsModalActive] = useState(true);

    useEffect(() => {
        let embed;
        let EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';
        // https://www.twitch.tv/popout/pixelwaresd/chat

        const script = document.createElement('script');
        script.setAttribute(
          'src',
          EMBED_URL
        );
        script.addEventListener('load', () => {
          embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
        });
            document.body.appendChild(script);
    }, [])

    return ( 
        <div>
            <button>Twitch</button>

            {isModalActive && (
                <div className="modal"
                    style={{
                        position: "fixed",
                        top: "0",
                        right: "0",
                        width: "50%",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 10,

                    }}
                >
                    <iframe height="378" width="300" frameborder="0" scrolling="no" src="https://www.twitch.tv/pixelwaresd/chat"></iframe>
                </div>
            )}
        </div>
     );
}
 
export default TwitchModalButton;