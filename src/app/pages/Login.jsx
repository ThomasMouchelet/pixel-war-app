import { login } from "../../setup/services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../setup/context/UserContext";

const Login = () => {
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    
    console.log(data);
      try{
        const response = await login(data)
        console.log(response);
        if(response){
          setUser(response)
          navigate("/");
        }
      }catch(e){
        console.log(e);
        setError(true);
      }
  };

  const handleResetPassword = () => {
    navigate('/reset')
  }

  return (
    <>
      <h1>Login</h1>
      {error && <p>Les informations ne sont pas correctes</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Connexion</button>
      </form>
      <button onClick={handleResetPassword}>Mot de passe oubliée</button>
      <iframe height="378" width="300" frameborder="0" scrolling="no" src="https://www.twitch.tv/pixelwaresd/chat"></iframe>
    </>
  );
};

export default Login;
