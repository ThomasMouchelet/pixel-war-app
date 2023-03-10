import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../setup/services/auth.service";
import AuthLayout from "../layout/AuthLayout";

const ResetPassword = () => {
  const [result, setResult] = useState("");
  const [credentials, setCredentials] = useState("");

  const handleChange = (e) => {
    setCredentials(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      resetPassword(credentials)
      setResult("Un email de réinitialisation de mot de passe a été envoyé à l'adresse indiquée");
    } catch (error) {
      setResult("Une erreur est survenue, veuillez vérifier votre adresse mail avant de renvoyer une demande");
    }
  };

  const renderResult = () => {
    if (result !== "") {
      if (result === "Un email de réinitialisation de mot de passe a été envoyé à l'adresse indiquée") {
        return <p className="l-reset__success">{result}</p>;
      } else {
        return <p className="l-reset__error">{result}</p>;
      }
    }
  };

  return (
    <AuthLayout>
      <div className="l-reset">
        <h1>Tu as oublié ton mot de passe ?</h1>
        {renderResult()}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Adresse mail"
            onInput={handleChange}
          />
          <button type="submit">
            <div className="l-login__before"></div>
            Envoyer la demande
            <div className="l-login__after"></div>
          </button>
        </form>
        <Link className="l-login__forgot" to="/connexion">
          Annuler
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
