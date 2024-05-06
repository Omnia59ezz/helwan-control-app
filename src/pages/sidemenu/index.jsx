import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helpers/storage";

const SideMenu = ({ activeItem }) => {
  const authUser = getAuthUser(); 
  const isSuperAdmin = authUser && authUser.userRole === "SuperAdmin";

  return (
    <div className="container-fluid" dir="rtl">
      <div className="row">
        <div className="col-md-2">
          <div className={styles.sideMenu}>
            <div
              className={`${styles.menuItem} ${
                activeItem === "dashboard" && styles.active
              }`}
              onClick={() => (activeItem = "dashboard")}
            >
              البرامج الدراسيه
            </div>
            <div
              className={`${styles.menuItem} ${
                activeItem === "reports" && styles.active
              }`}
              onClick={() => (activeItem = "reports")}
            >
              التقارير
            </div>
            {isSuperAdmin && (
              <div
                className={  ` ${styles.menuItem} ${
                  activeItem === "controlUni" && styles.active
                }`}
                onClick={() => (activeItem = "controlUni")} style={{textDecoration:"none"}}
              >
                <Link to="/manageuni">ادارة الجامعات </Link>
              </div>
            )}
            {isSuperAdmin && (
              <div
                className={`${styles.menuItem} ${
                  activeItem === "userManagement" && styles.active
                }`}
                onClick={() => (activeItem = "userManagement")}
              >
                <Link to="/manageusers">إدارة المستخدمين</Link>
              </div>
            )}
            {isSuperAdmin && (
              <div
                className={`${styles.menuItem} ${
                  activeItem === "controlSystem" && styles.active
                }`}
                onClick={() => (activeItem = "controlSystem")}
              >
                <Link to="/controls">نظام التحكم</Link>
              </div>
            )}
            
          </div>
        </div>
        <div className="col-md-10">
          <nav className={`${styles["navbar"]} border border-2 shadow p-2 mb-1  `}>
            <div className="nav-content fs-5 fw-semibold p-3">
              <a className="navbar-brand" href="#">
                <img
                  src="../src\assets\imgs\book.svg"
                  alt="Logo"
                  width="25"
                  height="20"
                  className="d-inline-block align-text-center"
                />
                البرامج الدراسيه
              </a>
              {isSuperAdmin && (
                <Link className="navbar-brand fs-5 fw-semibold" to="/manageuni">
                  <img
                    src="../src\assets\imgs\gear-wide-connected.svg"
                    alt="Logo"
                    width="25"
                    height="20"
                    className=" ms-3 d-inline-block align-text-center"
                  />
                  إدارة الجامعات
                </Link>
              )}
              {isSuperAdmin && (
                <Link className="navbar-brand fs-5 fw-semibold" to="/manageusers">
                  <img
                    src="../src\assets\imgs\gear-wide-connected.svg"
                    alt="Logo"
                    width="25"
                    height="20"
                    className=" ms-3  d-inline-block align-text-center"
                  />
                  إدارة المستخدمين
                </Link>
              )}
              {isSuperAdmin && (
                <Link className="navbar-brand fs-5 fw-semibold" to="/controls">
                  <img
                    src="../src\assets\imgs\gear-wide-connected.svg"
                    alt="Logo"
                    width="25"
                    height="20"
                    className="d-inline-block ms-3 me-3 align-text-center"
                  />
                  نظام التحكم
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
