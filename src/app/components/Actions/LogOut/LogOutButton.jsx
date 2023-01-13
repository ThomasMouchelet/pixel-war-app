import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../setup/utils/useApi";
import logoutlogo from "../../../assets/images/logout-logo.png";
const LogOutButton = ({hide}) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
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