import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { Link } from "react-router-dom";
import { FeatherIcons, Image } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import {
  handleResponsiveToggle,
  setToggleSidebar,
} from "../../ReduxToolkit/Reducer/LayoutSlice";

const LogoWrapper = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);

  return (
    <>
      <div className="logo-wrapper">
        <Link
          to={`${process.env.PUBLIC_URL}/pages/samplepage`}
          className="d-inline-block"
        >
          <Image
            className="img-fluid"
            src={dynamicImage("logo/3.png")}
            alt="logo"
          />
        </Link>
        <div
          className="back-btn"
          onClick={() => dispatch(handleResponsiveToggle())}
        >
          <i className="fa fa-angle-left"></i>
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
        >
          <FeatherIcons
            className="status_toggle middle sidebar-toggle"
            iconName="Grid"
          />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/pages/samplepage`}>
          <Image
            className="img-fluid"
            src={dynamicImage("logo/logo-icon.png")}
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
};

export default LogoWrapper;
