import { useEffect, useState } from "react";
import coin from "../../assets/images/coin.png";
import trophy from "../../assets/images/trophy.png";
import present from "../../assets/images/present.png";
import openPresent from "../../assets/images/open-present.png";
import close from "../../assets/images/close_icon.png";

const ProgressBar = ({ progress, hide }) => {
  const [coins, setCoins] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupConcours, setPopupConcours] = useState(false);
  const [barProgress, setBarProgress] = useState(true);
  const [valueProgress, setValueProgress] = useState(0);
  const [coinModal, setCoinModal] = useState(false);

  useEffect(() => {
    const reste = progress % 100;
    const coinsInitValue = (progress - reste) / 100;

    setCoins(coinsInitValue);
    setValueProgress(reste);

    if (coins < 9) {
      if (progress === 100) {
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 5000);
      }
    }
  }, [progress]);

  useEffect(() => {
    if (coins === 10) {
      setPopupConcours(true);
      setBarProgress(false);
      setTimeout(() => {
        setPopupConcours(false);
      }, 5000);
    }
  }, [coins]);

  return (
    <div className={!hide ? "c-progressbar" : "hide"}>
      {coins < 10 ? (
        <div
          className="c-progressbar__totalcoins"
          onClick={() => setCoinModal(!coinModal)}
        >
          <img src={!coinModal ? present : close} alt="" />

          <div
            className={
              !coinModal ? "coin-modal" : "coin-modal coin-modal-active"
            }
          >
            <div className="coin-modal__header">
              <span>Gagne des Airpods 3</span>
            </div>
            <div className="coin-modal__body">
              <img src={openPresent} alt="" />
            </div>
            <div className="coin-modal__footer">
              <img src={coin} alt="" />
              <span>{coins} / 10</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="c-progressbar__totalcoins">
          <span className="c-progressbar__coins">
            <img src={trophy} alt="" />
          </span>
        </div>
      )}

      <div className="c-progressbar__allbar" id="coins">
        {barProgress ? (
          <div>
            <div>
              <div className="c-progressbar__barTop1"></div>
              <div className="c-progressbar__barTop2"></div>
              <div className="c-progressbar__barTop3"></div>
            </div>
            <div className="c-progressbar__bar">
              <div
                className="c-progressbar__fill"
                style={{ height: `calc(${valueProgress} * 5%)` }}
              ></div>
            </div>
            <div>
              <div className="c-progressbar__barBottom1"></div>
              <div className="c-progressbar__barBottom2"></div>
              <div className="c-progressbar__barBottom3"></div>
            </div>
          </div>
        ) : (
          ""
        )}

        {popupVisible ? (
          <div className="c-progressbar__popup">
            <span className="c-progressbar__coins">
              <img src={coin} alt="" />
              +1
            </span>
          </div>
        ) : (
          ""
        )}
      </div>

      {popupConcours ? (
        <div className="c-progressbar__concours">
          <img
            src={trophy}
            className="c-progressbar__concours__trophy"
            alt=""
          />
          <p className="c-progressbar__p">
            Vous êtes maintenant éligible au tirage au sort
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProgressBar;
