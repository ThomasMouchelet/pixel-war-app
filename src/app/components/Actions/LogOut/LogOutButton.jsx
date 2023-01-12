import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../setup/utils/useApi";
import logoutlogo from "../../../assets/images/logout-logo.png";
const LogOutButton = () => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
        navigate('/connexion')
    }

    return ( 
        <div className="action-menus__menu__item btn-logout" 
        onClick={handleLogOut}
        style={{
            width: '51px',
            height: '51px',
            background: '#FFF',
            borderRadius: '100px',
            bottom: '30px',
            right: '5%',
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
            <img src={logoutlogo} alt="" />
        </div>
     );
}
 
export default LogOutButton;