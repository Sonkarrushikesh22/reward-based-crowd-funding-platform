import HamburgerImage from "../../../assets/icons/hamburger.png";
import HomeImage from "../../../assets/icons/home.png";
import DashboardImage from "../../../assets/icons/dashboard.png";
import DonationImage from "../../../assets/icons/donation.png";
import SupportImage from "../../../assets/icons/support.png";
import MoneyImage from "../../../assets/icons/money.png";
import LoginImage from "../../../assets/icons/login.png";
import LogoutImage from "../../../assets/icons/logout.png";
import DownArrowImage from "../../../assets/icons/down-arrow.png";
// <div>Icons made by <a href="" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

import React, { useState, useEffect, useContext } from "react";
//  import { logout } from '../../../redux/actions/authActions'; // Path might be different 
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePicture from "../../UIComponents/ProfilePicture/ProfilePicture";
import DropdownMenu from "../../UIComponents/DropdownMenu/DropdownMenu";
import GoogleAuth from "../../../components/GoogleAuth/GoogleAuth";
import CloseButton from "../../UIComponents/buttons/CloseButton";
import { WindowContext } from "../../../AppContext";
import "./NavMenu.scss";

const NavMenu = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const user = useSelector((state) => state.user.info);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const [showFundraisersDropdownMenu, setShowFundraisersDropdownMenu] =
    useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  const getNavMenuClass = () => (showNavMenu ? "show" : "hide");
  const getUserProfilePictureClass = () =>
    showUserDropdownMenu ? "active" : "";
  const getFundraisersDropdownActiveClass = () =>
    showFundraisersDropdownMenu ? "show" : "hide";

  // event handler functions
  const navmenuOnOpenHandler = () => {
    setShowNavMenu(true);
  };

  const navmenuOnCloseHandler = () => {
    setShowNavMenu(false);
  };

  const fundraiserOnMouseEnterHandler = () => {
    setShowFundraisersDropdownMenu(true);
  };
  const fundraiserOnMouseLeaveHandler = () => {
    setShowFundraisersDropdownMenu(false);
  };
/*   const handleLogout = () => {
     const dispatch = useDispatch();
 // Access dispatch via props
    dispatch(logout());
} */
  const userProfilePictureonClickHandler = (e) => {
    e.stopPropagation();
    if (!showUserDropdownMenu) setShowUserDropdownMenu(true);
    else setShowUserDropdownMenu(false);
  };

  const userDropdownMenuOnCloseHandler = () => {
    setShowUserDropdownMenu(false);
  };

  const stopPropagationOnMouseEnterHandler = (e) => e.stopPropagation();

  const renderFundraisersDropdownMenu = () => {
    // if (!showFundraisersDropdownMenu) return null;
    return (
      <DropdownMenu
        style={{
          position: "absolute",
          left: "7.4rem",
          top: "3.6rem",
          minWidth: "12rem",
        }}
        noReactPortal={true}
        onMouseEnterStopPropagation={true}
        className={`dropdown--position-absolute ${getFundraisersDropdownActiveClass()}`}
      >
        <Link
          to={`/fundraisers`}
          className="dropdown__button dropdown--position-absolute"
        >
          All fundraisers
        </Link>
        <Link
          to={`/fundraisers?sort=amount_donated`}
          className="dropdown__button dropdown--position-absolute"
        >
          Top fundraisers
        </Link>
        <Link
          to={`/fundraisers?sort=created`}
          className="dropdown__button dropdown--position-absolute"
        >
          Newest fundraisers
        </Link>
        <Link
          to={`/fundraisers?filter=finished&sort=amount_donated`}
          className="dropdown__button dropdown--position-absolute"
          onMouseEnter={stopPropagationOnMouseEnterHandler}
        >
          Finished fundraisers
        </Link>
       
      </DropdownMenu>
    );
  };

  const renderUserDropdownMenu = () => {
    if (!showUserDropdownMenu) return null;
    return (
      <DropdownMenu
        style={{
          position: "fixed",
          right: "1rem",
          top: "3.6rem",
          minWidth: "12rem",
        }}
        onClose={userDropdownMenuOnCloseHandler}
      >
        <div className="dropdown__item--flex" id="dropdown__profile">
          <div className="dropdown__img-div">
            <ProfilePicture className="user-dropdown" />
          </div>
          <div className="dropdown__text-div">
            <h4 className="dropdown__user">{user && user.username}</h4>
            <span className="dropdown__span">Registered User</span>
          </div>
        </div>
        {/*<Link to={`/dashboard/profile`} className="dropdown__button">
          Your profile
        </Link>*/}
        <Link to={`/dashboard/fundraising`} className="dropdown__button">
          <img
            className="dropdown__button-img"
            src={DonationImage}
            alt="Donation Icon"
          />
          <span>Your fundraisers</span>
        </Link>
        <Link to={`/dashboard/donations`} className="dropdown__button">
          <img
            className="dropdown__button-img"
            src={SupportImage}
            alt="Support Icon"
          />
          <span>Supported fundraisers</span>
        </Link>
        <Link to={`/dashboard/payout`} className="dropdown__button">
          <img
            className="dropdown__button-img"
            src={MoneyImage}
            alt="Money Icon"
          />
          <span>Payout</span>
        </Link>
        {/*<button to={`/dashboard/`} className="dropdown__button">
          Toggle appearance: Dark
        </button>
        <Link to={`/dashboard/settings`} className="dropdown__button">
          Settings
        </Link>*/}
        {/* <GoogleAuth
          className="dropdown__button"
          onClickHandler={userDropdownMenuOnCloseHandler}
          img={
            <img
              id="dropdown__logout-img"
              className="dropdown__button-img"
              src={LogoutImage}
              alt="Logout Icon"
            />
          }
        /> */}
         {/*   <button className="dropdown__button" onClick={handleLogout}>
                <img
                    id="dropdown__logout-img"
                    className="dropdown__button-img"
                    src={LogoutImage}
                    alt="Logout Icon"
                />
                <span>Logout</span> 
            </button> */}
              <Link  className="dropdown__button" to="/logout">
        <img
              id="dropdown__logout-img"
              className="dropdown__button-img"
              src={LogoutImage}
              alt="Logout Icon"
          />
          <span>Logout</span> 
      </Link>
      </DropdownMenu>
    );
  };

  // renderConditionalItems
  const renderConditionalItems = () =>
    !isSignedIn ? (
      <Link to="/login" className="navmenu__item">
        <img className="navmenu__item-img" src={LoginImage} alt="Login Image" />
        <span>Login</span>
      </Link>
    ) : (
      <>
        {/*only allow access to dashboard & logout if user is signed in*/}
        <Link to="/dashboard" className="navmenu__item">
          <img
            className="navmenu__item-img"
            src={DashboardImage}
            alt="Dashboard Image"
          />
          <span>Dashboard</span>
        </Link>
        
        {!isNonMobileWidth && (
          /*  <GoogleAuth
            className="navmenu__item"
            onClickHandler={navmenuOnCloseHandler}
            img={
              <img
                id="navmenu__logout-img"
                className="navmenu__item-img"
                src={LogoutImage}
                alt="Logout Icon"
              />
            }
          /> 
           <button className="dropdown__button" onClick={handleLogout}>
          <img
              id="dropdown__logout-img"
              className="dropdown__button-img"
              src={LogoutImage}
              alt="Logout Icon"
          />
          <span>Logout</span> 
      </button> */ 
      <Link  className="dropdown__button"to="/logout">
        <img
              id="dropdown__logout-img"
              className="dropdown__button-img"
              src={LogoutImage}
              alt="Logout Icon"
          />
          <span>Logout</span> 
      </Link>
        )}
        {isNonMobileWidth && (
          <ProfilePicture
            className={`navmenu ${getUserProfilePictureClass()}`}
            onClick={userProfilePictureonClickHandler}
          />
        )}
      </>
    );
  // render component
  return (
    <>
      {renderUserDropdownMenu()}
      {/*hamburger*/}
      <button
        className="navmenu__button"
        id="navmenu__hamburger"
        onClick={navmenuOnOpenHandler}
      >
        <img
          className=""
          id="navmenu__hamburger-image"
          src={HamburgerImage}
          alt="hamburger icon"
        />
      </button>
      {/*navmenu container &items*/}
      <div
        class={`navmenu__backdrop backdrop mobile-only ${getNavMenuClass()}`}
        onClick={navmenuOnCloseHandler}
      ></div>
      <div className={`navmenu__outer-container ${getNavMenuClass()}`}>
        <div className="navmenu__title-close-container">
          <Link to="/" id="navmenu__title-link">
            RestoFund
          </Link>
          <CloseButton
            hideOnDesktop={true}
            className="navmenu__close"
            onClickHandler={navmenuOnCloseHandler}
          />
        </div>
        <ul className="navmenu__items">
          <Link to="/" className="navmenu__item">
            <img
              className="navmenu__item-img"
              src={HomeImage}
              alt="Home Image"
            />
            <span>Home</span>
          </Link>
          <Link
            to="/fundraisers"
            className="navmenu__item button--icon"
            onMouseEnter={fundraiserOnMouseEnterHandler}
            onMouseLeave={fundraiserOnMouseLeaveHandler}
          >
            <img
              className="navmenu__item-img"
              src={SupportImage}
              alt="Fundraisers Image"
            />
            <span className="navmenu__item-span">Fundraisers</span>
            <img
              className="navmenu__item-img button__icon"
              src={DownArrowImage}
              alt="down arrow image"
            />
            {renderFundraisersDropdownMenu()}
          </Link>
          {renderConditionalItems()}
        </ul>
      </div>
    </>
  );
};

export default NavMenu;

/*
<div className={toggleHeader}>
  <p className={toggleIcon} onClick={handleClose}>
    X
  </p>
  <section className="nav">
    <Link to="/fundraisers">New  Projects</Link>
    {!isSignedIn ?
    <Link to="/login">Login</Link> : null}
    {isSignedIn ? (
      <>
        <Link to="/dashboard">Dashboard</Link>{" "}
        <GoogleAuth className="user-nav__link" />
      </>
    ) : null}
  </section>
</div>
*/
