import { useEffect, useState } from "react";
import arrowIcon from "../../assets/images/arrow.png";

const tutorialData = [
  {
    title: "Prends un screen du canva",
    description: (
      <p className="c-tutorial__description">
        Par ce bouton, tu peux afficher la map sans les informations du jeu et
        partager ton meilleur pixel art à tes potes !
      </p>
    ),
  },
  {
    title: "Afficher ou masquer le chat",
    description: (
      <p className="c-tutorial__description">
        Connecte-toi à Twitch, pour pouvoir interagir avec les autres joueurs.{" "}
        <b>Lies toi</b> aux autres pour détruire les créations de tes
        adversaires ou créer ensemble.
      </p>
    ),
  },
  {
    title: "Dernières actions des joueurs",
    description: (
      <p className="c-tutorial__description">
        Vois les derniers utilisateur qui ont placés des pixels pour savoir qui
        t’attaque !
      </p>
    ),
  },
  {
    title: "Temps du jeu",
    description: (
      <p className="c-tutorial__description">
        Observe le temps qu’il te reste avant la fin de la partie.
      </p>
    ),
  },
  {
    title: "Choisis ta couleur",
    description: (
      <p className="c-tutorial__description">
        Grace à ça tu peux afficher la map sans les informations du jeu et
        partager ton meilleur pixel art à tes potes.
      </p>
    ),
  },
  {
    title: "L’objectif final",
    description: (
      <p className="c-tutorial__description">
        Au bout d’un certain nombre de pixels placés, tu gagneras un coin. Afin
        d’être éligible au tirage au sort pour gagner les airpods 3, il te
        faudra avoir gagné au mois <span>10 coins.</span>
      </p>
    ),
  },
];

const Tutorial = ({ step, setStep }) => {
  useEffect(() => {
    if (step > 6) {
      localStorage.setItem("tutorial", true);
    }

    switch (step) {
      case 1:
        document.querySelector("#eye").classList.add("c-tutorial--active");
        document
          .querySelector("#twitch")
          .classList.remove("c-tutorial--active");
        break;
      case 2:
        document.querySelector("#eye").classList.remove("c-tutorial--active");
        document.querySelector("#twitch").classList.add("c-tutorial--active");
        // document
        //   .querySelector("#people")
        //   .classList.remove("c-tutorial--active");
        break;
      case 3:
        document
          .querySelector("#twitch")
          .classList.remove("c-tutorial--active");
        // document.querySelector("#people").classList.add("c-tutorial--active");
        // document
        //   .querySelector("#time")
        //   .classList.remove("c-tutorial--active--absolute");
        break;
      case 4:
        // document
        //   .querySelector("#people")
        //   .classList.remove("c-tutorial--active");
        // document
        //   .querySelector("#time")
        //   .classList.add("c-tutorial--active--absolute");
        document
          .querySelector("#colors")
          .classList.remove("c-tutorial--active--absolute");
        break;
      case 5:
        // document
        //   .querySelector("#time")
        //   .classList.remove("c-tutorial--active--absolute");
        document
          .querySelector("#colors")
          .classList.add("c-tutorial--active--absolute");
        document
          .querySelector("#coins")
          .classList.remove("c-tutorial--active--absolute");
        break;
      case 6:
        document
          .querySelector("#colors")
          .classList.remove("c-tutorial--active--absolute");
        document
          .querySelector("#coins")
          .classList.add("c-tutorial--active--absolute");
        break;
      default:
        document.querySelector("#eye").classList.remove("c-tutorial--active");
        document.querySelector("#coins").classList.remove("c-tutorial--active");
        document
          .querySelector("#twitch")
          .classList.remove("c-tutorial--active");
        // document.querySelector("#people").classList.remove("c-tutorial--active");
        document
          .querySelector("#time")
          .classList.remove("c-tutorial--active--absolute");
        document
          .querySelector("#colors")
          .classList.remove("c-tutorial--active--absolute");
        document
          .querySelector("#coins")
          .classList.remove("c-tutorial--active--absolute");
    }
  }, [step]);

  const renderButtons = () => {
    switch (step) {
      case 6:
        return (
          <div className="c-tutorial__buttons">
            <button
              className="c-tutorial__button--next"
              onClick={() => setStep(step + 1)}
            >
              <span className="c-tutorial__button--next__before"></span>
              C'est parti !
              <span className="c-tutorial__button--next__after"></span>
            </button>
          </div>
        );
      default:
        return (
          <div className="c-tutorial__buttons">
            <button
              className="c-tutorial__button--pass"
              onClick={() => setStep(7)}
            >
              <span className="c-tutorial__button--pass__before"></span>
              Passer les règles
              <span className="c-tutorial__button--pass__after"></span>
            </button>
            <button
              className="c-tutorial__button--next"
              onClick={() => setStep(step + 1)}
            >
              <span className="c-tutorial__button--next__before"></span>
              Suivant
              <span className="c-tutorial__button--next__after"></span>
            </button>
          </div>
        );
    }
  };

  const renderTutorial = () => {
    if (step < 7 && !localStorage.getItem("tutorial")) {
      return (
        <div className="c-tutorial">
          <div className="c-tutorial__wrapper">
            <div className="c-tutorial__wrapper__left"></div>
            <div className="c-tutorial__head">
              {step > 1 && (
                <button
                  className="c-tutorial__previous"
                  onClick={() => setStep(step - 1)}
                >
                  <img src={arrowIcon} alt="" />
                </button>
              )}
              <p className="c-tutorial__step">{step}/6</p>
            </div>
            <h2 className="c-tutorial__title">
              {tutorialData[step - 1].title}
            </h2>
            {tutorialData[step - 1].description}
            {renderButtons()}
            <div className="c-tutorial__wrapper__right"></div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderTutorial();
};

export default Tutorial;
