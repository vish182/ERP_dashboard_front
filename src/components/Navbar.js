import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AVLogo from "../assets/emphasys_logo.jpg";
// import Media from "react-media";
// import { CSSTransition } from "react-transition-group";
import { useAuth } from "../contexts/AuthContext";
// import forward from "../assets/forward.svg";
// import back from "../assets/back.svg";
import { isAuthorized } from "../auth/utility";
import { getUserData } from "../auth/firestore_auth";

export const Navbar = () => {
  // console.log(window.matchMedia('(min-width: 800px)').matches);
  // const [minWidth, setMinWidth] = useState(false);

  return (
    <nav className="navbar">
      {console.log("rendered")}
      <Logo />
      <div className="desk-nav">
        <NavItems />
      </div>
      <div className="mob-nav">
        <BurgerMenu />
      </div>
    </nav>
  );
};

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (open) => {
    setOpen(open);
  };

  return (
    <>
      <a
        href="#"
        className="navbar-burger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>

      {open && <NavItems openCallback={handleOpen} />}
    </>
  );
};

const NavItems = ({ openCallback }) => {
  const { currentUser, logout, currentUserDoc } = useAuth();
  const history = useHistory();

  const [userDoc, maintainUserDoc] = useState({});

  useEffect(() => {
    //console.log("render navbar00", !currentUserDoc.role);
    //console.log("render navbar doc", currentUserDoc);
    async function loadUserDoc() {
      if (!currentUserDoc.role && currentUser) {
        let userData = await getUserData(currentUser.email);
        //console.log("render navbar", userData);
        currentUserDoc.email_id = userData.email_id;
        currentUserDoc.role = userData.role;
        maintainUserDoc(userData);
      }
    }

    loadUserDoc();
  }, []);

  return (
    <ul
      className="navbar-nav"
      onClick={() => {
        openCallback && openCallback(false);
      }}
    >
      {/* <NavItem text="Parts" route="/"/> */}

      {!currentUser && (
        <>
          <NavItem text="Sign-in" route="/signin" />
          <NavItem text="Sign-up" route="/signup" />
        </>
      )}
      {currentUser && (
        <>
          <NavItem text="Records" route="/" />
          <NavItem text="Dashboard" route="/dashboard" />
          {/* <NavItem text="Time" route="/time" /> */}
          <NavItem text="History" route="/history" />
          <NavItem text="Archives" route="/archives">
            {/* {ul drop down} */}
          </NavItem>
          {currentUser && isAuthorized({ role: userDoc.role }) > 0 && (
            <NavItem text="Users" route="/users" />
          )}

          <li
            className="nav-item"
            onClick={async () => {
              await logout();
              history.push("/signin");
            }}
          >
            Log out{" "}
          </li>
        </>
      )}
    </ul>
  );
};

// <ul className="drop">
//     <DropItem text="Category1" classStyle="drop-item">
//         <ul className="drop-sub">
//             <DropItem text="Item11" classStyle="drop-item-sub-first" ></DropItem>
//             <DropItem text="Item12" classStyle="drop-item-sub"></DropItem>
//         </ul>
//     </DropItem>
//     <DropItem text="Category1" classStyle="drop-item">
//         <ul className="drop-sub">
//             <DropItem text="Item21" classStyle="drop-item-sub-first"></DropItem>
//             <DropItem text="Item22" classStyle="drop-item-sub"></DropItem>
//         </ul>
//     </DropItem>
// </ul>

/* <Media query="(min-width: 800px)">
            {matches => {
                setOpen( matches ? true : false);
                return(
                    <nav className="navbar">
                        <Logo/>
                        {open && <ul className="navbar-nav" onClick={() => {setOpen(!open)}}>
                        
                            <NavItem text="Home" route="/"/>
                            <NavItem text="About Us" route="/about"/>
                            <NavItem text="Services" route="/services"/>
                            
                            <NavItem text="Products" route="#">
                                <ul className="drop">
                                    <DropItem text="Category1" classStyle="drop-item">
                                        <ul className="drop-sub">
                                            <DropItem text="Item11" classStyle="drop-item-sub-first" ></DropItem>
                                            <DropItem text="Item12" classStyle="drop-item-sub"></DropItem>
                                        </ul>
                                    </DropItem>
                                    <DropItem text="Category1" classStyle="drop-item">
                                        <ul className="drop-sub">
                                            <DropItem text="Item21" classStyle="drop-item-sub-first"></DropItem>
                                            <DropItem text="Item22" classStyle="drop-item-sub"></DropItem>
                                        </ul>
                                    </DropItem>
                                </ul>
                            </NavItem>
                            <NavItem text="Parts" route="/"/>
                            <NavItem text="Contact Us" route="#"/>
                        </ul>}
                        <a href="#" className="navbar-burger" onClick={() => {setOpen(!open)}}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </a>
                    </nav>
                )
            }}
        </Media> */

const NavItem = (props) => {
  // const [open, setOpen] = useState(false);
  // activeClassName="active-nav-button"
  // <li className="nav-item" onMouseEnter={() => {setOpen(true)}}  onMouseLeave={() => {setOpen(false)}} onClick={() => {setOpen(!open)}}></li>
  return (
    <NavLink
      exact
      to={props.route ? props.route : "/"}
      className="nav-item-link"
    >
      <li className="nav-item">
        {props.text}
        {/* {open && props.children} */}
      </li>
    </NavLink>
  );
};

// const DropItem = (props) => {
//   const [open, setOpen] = useState(false);
//   // activeClassName="active-nav-button"
//   return (
//     <li
//       className={props.classStyle}
//       onMouseEnter={() => {
//         setOpen(!open);
//       }}
//       onMouseLeave={() => {
//         setOpen(!open);
//       }}
//     >
//       <NavLink
//         exact
//         to={props.route ? props.route : "/"}
//         className="nav-item-link"
//       >
//         {props.text}
//       </NavLink>

//       {open && props.children}
//     </li>
//   );
// };

// const Dropdown = () => {

//     const [activeMenu, setActiveMenu] = useState('main');
//     const [menuHeight, setMenuHeight] = useState(null);

//     function calcHeight(el){
//         const height = el.offsetHeight;
//         setMenuHeight(height);
//     }

//     const DropdownItem = (props) => {
//         return(
//             <Link exact to={props.product_name ? `/products/product/${props.product_name}` : "#"} className="menu-item" onClick={() => {
//                         props.goToMenu && setActiveMenu(props.goToMenu);
//                         window.scrollTo(0, 0);
//                     }
//                 }>
//                 {window.scrollTo(0, 0)}
//                 {props.leftIcon && <span className="icon-button"><img src={props.leftIcon} className="icon-button"/></span>}
//                 <span className="drop-button-text">{props.children}</span>
//                 {props.rightIcon && <span className="icon-right"><img src={props.rightIcon} className="icon-button"/></span>}
//             </Link>
//         );
//     }

//     return(
//         <div className="dropdown" style={{height: menuHeight}}>
//             <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
//                <div className="menu">
//                 <DropdownItem goToMenu='category1' rightIcon={forward}>Category1</DropdownItem>
//                 <DropdownItem>Category2</DropdownItem>
//                </div>
//             </CSSTransition>

//             <CSSTransition in={activeMenu === 'category1'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
//                <div className="menu">
//                 <DropdownItem goToMenu='main' leftIcon={back}/>
//                 <DropdownItem product_name={"product1"}>product1</DropdownItem>
//                 <DropdownItem product_name={"product2"}>product2</DropdownItem>
//                </div>
//             </CSSTransition>
//          </div>
//     );
// }

const Logo = () => {
  return (
    <span className="logo-div">
      <img src={AVLogo} alt="" className="logo" />
    </span>
  );
};
