import backgroundImage from "../assets/images/backgroung222.png"

const AuthLayout = ({children}) => {
    return ( 
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "140%",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}
        >
            {children}
        </div>
     );
}
 
export default AuthLayout;