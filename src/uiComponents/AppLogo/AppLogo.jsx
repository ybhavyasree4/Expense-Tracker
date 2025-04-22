import "./AppLogo.css";
import logo from "./Logo1.png";

const AppLogo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="LogoImage" className="logoImage" />

    </div>
  );
};

export default AppLogo;
