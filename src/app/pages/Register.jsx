import { useNavigate, Link} from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createUser } from "../../setup/utils/useApi";
import {UserContext} from "../../setup/context/UserContext";

const Register = () => {
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const team = e.target.teams.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target["password-confirm"].value;
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    const data = {
      username: username,
      password: password,
      email: email
    }
    createUser(data)
    setUser(data)
    navigate('/')
    // const data = { username, password, email, team };
    // fetch(process.env.REACT_APP_API + "/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((e) => {
    //     setError("Une erreur est survenue");
    //     console.log(e);
    //   });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "/team")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeams(data);
      });
  }, []);

  return (
    <div className="l-register">
      <h1>
        Créé ton compte pour rejoindre la <br /> bataille !
      </h1>
      {error !== "" && <p className="l-login__error">{error}</p>}
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
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p className="l-login__register">
        Déjà un compte ? <Link to="/connexion">Connecte-toi</Link>
      </p>
    </div>
  );
};
export default Register;
