import CloseIcon from "../../../assets/images/close_icon.png";
import coin from "../../../assets/images/coin.png";
import illustrationPose from "../../../assets/images/Illustration_pose_pixels.png";
import illustrationGain from "../../../assets/images/Illustration_gains.png";
import illustrationTemps from "../../../assets/images/Illustration_temps_pause.png";

const RulesModal = ({ isModalActive, setIsModalActive }) => {
  return (
    <div className={isModalActive ? "rules-modal modal-active" : "rules-modal"}>
      <div className="rules-modal__content">
        <img className="close-icon" src={CloseIcon} alt="" onClick={() => setIsModalActive(false)} />
        <div className="rules-modal__content__header">
          <h2>
            Consignes<span>Consignes</span>
          </h2>
        </div>

        <div className="rules-modal__content__body">
          <p>
            Sélectionne une couleur puis place ton pixel sur la fresque.
            L’objectif est de placer le plus de pixels possibles au cours de la
            période de jeu. Attention, il te faudra patienter{" "}
            <span>une minute</span> entre deux poses de pixels, le sélecteur de
            couleur changé en chronomètre te l’indiquera.
          </p>
          <p>
            Tous les 20 pixels placés, tu gagneras un <img className="coin-rules" src={coin} alt=""/> . Afin d’être éligible au
            tirage au sort, il te faudra avoir gagné au mois
            <span> 10 coins</span>.
          </p>
          <p>Que la bataille des pixels commence ! </p>
          <div className="images">
            <img src={illustrationPose} alt="" />
            <img src={illustrationGain} alt="" />
            <img src={illustrationTemps} alt="" />
          </div>

          <div className="rules-card-container">

          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
