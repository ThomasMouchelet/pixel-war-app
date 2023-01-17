import { login } from "../../setup/services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../setup/context/UserContext";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };

    try {
      const response = await login(data);
      if (response) {
        setUser(response);
        navigate("/");
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <AuthLayout>
      <div className="l-login">
        <h1>Connecte-toi et rejoins la bataille !</h1>
        {error && (
          <p className="l-login__error">
            Les informations ne sont pas correctes
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Adresse email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
          </div>
          <button type="submit">
            <div className="l-login__before"></div>
            Connexion
            <div className="l-login__after"></div>
          </button>
        </form>
        <Link to="/reset" className="l-login__forgot">
          Mot de passe oubliée
        </Link>
        <p className="l-login__register">
          Pas de compte ? <Link to="/inscription">Inscris-toi</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
