import { useNavigate } from "react-router-dom";
import { logout } from "../../../../setup/services/auth.service";
import logoutlogo from "../../../assets/images/logout-logo.png";
const LogOutButton = ({hide}) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        logout()
        navigate('/connexion')
    }

    return ( 
        <div className={!hide ? "action-menus__menu__item btn-logout" : "hide"} 
        onClick={handleLogOut}
        >
            <img src={logoutlogo} alt="" />
        </div>
     );
}
 
export default LogOutButton;