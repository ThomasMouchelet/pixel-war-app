import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../setup/context/UserContext";
import AuthLayout from "../layout/AuthLayout";
import { register } from "../../setup/services/auth.service";

const Register = () => {
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      username: username,
      password: password,
      email: email,
    };

    try {
      register(data);
      setResult("Le compte a bien été créé");
      setUser(data);
      navigate("/");
    } catch (error) {
      if (e.stack.includes("email-already-in-use")) {
        setResult("L'email est déjà utilisé");
      } else {
        setResult("Une erreur est survenue");
      }
    }
  };

  const renderResult = () => {
    if (result === "") return;
    if (result === "Le compte a bien été créé") {
      return <p className="l-login__success">{result}</p>;
    } else {
      return <p className="l-login__error">{result}</p>;
    }
  };

  return (
    <AuthLayout>
      <div className="l-register">
        <h1>Créé ton compte pour rejoindre la bataille !</h1>
        {renderResult()}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            required
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            minLength={6}
            required
          />
          <button type="submit">
            <div className="l-login__before"></div>
            S'inscrire
            <div className="l-login__after"></div>
          </button>
        </form>
        <p className="l-login__register">
          Déjà un compte ? <Link to="/connexion">Connecte-toi</Link>
        </p>
      </div>
    </AuthLayout>
  );
};
export default Register;
