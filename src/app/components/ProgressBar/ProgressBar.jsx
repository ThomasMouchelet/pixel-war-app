import { useEffect, useState } from "react";
import coin from "../../assets/images/coin.png";
import trophy from "../../assets/images/trophy.png";

const ProgressBar = ({ progress, setProgress, hide }) => {
  const [coins, setCoins] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupConcours, setPopupConcours] = useState(false);
  const [barProgress, setBarProgress] = useState(true);
  const [valueProgress, setValueProgress] = useState(0);

  useEffect(() => {
    const reste = progress % 20
    const coinsInitValue = (progress - reste) / 20
    // const progressInitValue = progress * reste
    console.log('reste => ',reste);
    console.log('coinsInitValue => ',coinsInitValue);
    // console.log('progressInitValue => ',progressInitValue);

    setCoins(coinsInitValue)
    setValueProgress(reste)
  },[progress])

  // useEffect(() => {
  //   // if (progress >= 20) {
  //   //   setProgress(0);
  //   //   setCoins(coins + 1);
  //   // }
  //   const reste = progress % 20;
  //   console.log('reste => ',reste);
  //   if(progress >= 20){
      
  //   }
  //   // if (reste === 0) {
  //   //   setProgress(0);
  //   //   setCoins(coins + 1);
  //   // }else{
  //   //   setProgress(reste);
  //   // }
  // }, [progress]);

  useEffect(() => {
    if (coins < 9) {
      if (progress === 20) {
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
      setTimeout(() => {
        setPopupConcours(false);
      }, 5000);
    }
  }, [coins]);

  useEffect(() => {
    if (coins === 10) {
      setBarProgress(false);
    }
  }, [coins]);

  return (
    <div className={!hide ? "c-progressbar" : "hide"}>
      {coins < 10 ? (
        <div className="c-progressbar__totalcoins">
          <span className="c-progressbar__coins">
            <img src={coin} alt="" />
            {coins}/10
          </span>
        </div>
      ) : (
        <div className="c-progressbar__totalcoins">
          <span className="c-progressbar__coins">
            <img src={trophy} alt="" />
          </span>
        </div>
      )}

      <div className="c-progressbar__allbar">
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
          <img src={trophy} className="c-progressbar__concours__trophy" alt="" />
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
