import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/interviews`}>
              <FeatherIcon icon="grid" />
            </NavLink>
          )
        }
        key="interviews"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/interviews`}>
       My Interviews
        </NavLink>
      </Menu.Item>  



       <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/schedule`}>
              <FeatherIcon icon="list" />
            </NavLink>
          )
        }
        key="schedule"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/schedule`}>
        Schedule
        </NavLink>
      </Menu.Item>  




      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/profile`}>
              <FeatherIcon icon="user" />
            </NavLink>
          )
        }
        key="profile"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/profile`}>
        Profile
        </NavLink>
      </Menu.Item> 



        <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/logout`}>
              <FeatherIcon icon="log-out" />
            </NavLink>
          )
        }
        key="logout"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/logout`}>
        Logout
        </NavLink>
        </Menu.Item> 
      {/* </Menu.Item> 
      <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Dashboard">
        <Menu.Item key="home">
          <NavLink onClick={toggleCollapsed} to={`${path}`}>
            Social Media
          </NavLink>
        </Menu.Item>
        <Menu.Item key="business">
          <NavLink onClick={toggleCollapsed} to={`${path}/business`}>
            Fintech / Business
          </NavLink>
        </Menu.Item>
        <Menu.Item key="performance">
          <NavLink onClick={toggleCollapsed} to={`${path}/performance`}>
            Site Performance
          </NavLink>
        </Menu.Item>
        <Menu.Item key="eco">
          <NavLink onClick={toggleCollapsed} to={`${path}/eco`}>
            Ecommerce
          </NavLink>
        </Menu.Item>
        <Menu.Item key="crm">
          <NavLink onClick={toggleCollapsed} to={`${path}/crm`}>
            CRM
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sales">
          <NavLink onClick={toggleCollapsed} to={`${path}/sales`}>
            Sales Performance
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="layout" icon={!topMenu && <FeatherIcon icon="layout" />} title="Layouts">
        <Menu.Item key="light">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeLight();
            }}
            to="#"
          >
            Light Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dark">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeDark();
            }}
            to="#"
          >
            Dark Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="topMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeTopNav();
            }}
            to="#"
          >
            Top Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sideMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeSideNav();
            }}
            to="#"
          >
            Side Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rtl">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onRtlChange();
            }}
            to="#"
          >
            RTL
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ltr">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onLtrChange();
            }}
            to="#"
          >
            LTR
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/changelog`}>
              <FeatherIcon icon="activity" />
            </NavLink>
          )
        }
        key="changelog"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/changelog`}>
          Changelog
          <span className="badge badge-primary menuItem">{versions[0].version}</span>
        </NavLink>
      </Menu.Item>
      {!topMenu && <p className="sidebar-nav-title">Applications</p>}
      <SubMenu key="email" icon={!topMenu && <FeatherIcon icon="mail" />} title="Email">
        <Menu.Item key="inbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/inbox`}>
            Inbox
          </NavLink>
        </Menu.Item>
        <Menu.Item key="single">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/single/1585118055048`}>
            Read Email
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/main/chat/private/rofiq@gmail.com`}>
              <FeatherIcon icon="message-square" />
            </NavLink>
          )
        }
        key="chat"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/main/chat/private/rofiq@gmail.com`}>
          Chat
        </NavLink>
      </Menu.Item>
      <SubMenu key="ecommerce" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="eCommerce">
        <Menu.Item key="products">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/products`}>
            Products
          </NavLink>
        </Menu.Item>
        <Menu.Item key="productDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/productDetails/1`}>
            Product detail
          </NavLink>
        </Menu.Item>

        <Menu.Item key="add-product">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/add-product`}>
            Product Add
          </NavLink>
        </Menu.Item>

        <Menu.Item key="edit-product">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/edit-product`}>
            Product Edit
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cart">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/cart`}>
            Cart
          </NavLink>
        </Menu.Item>
        <Menu.Item key="orders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
            Orders
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sellers">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/sellers`}>
            Sellers
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Invoice">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/Invoice`}>
            Invoices
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="profile" icon={!topMenu && <FeatherIcon icon="aperture" />} title="Social App">
        <Menu.Item key="myProfile">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/overview`}>
            My Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item key="profileTimeline">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/timeline`}>
            Timeline
          </NavLink>
        </Menu.Item>
        <Menu.Item key="profileActivity">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/activity`}>
            Activity
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="project" icon={!topMenu && <FeatherIcon icon="target" />} title="Project">
        <Menu.Item key="view">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/view/grid`}>
            Project Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="views">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/view/list`}>
            Project List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ProjectCreate">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/create`}>
            Create Project
          </NavLink>
        </Menu.Item>
        <Menu.Item key="projectDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/projectDetails/1`}>
            Project Details
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/calendar/month`}>
              <FeatherIcon icon="calendar" />
            </NavLink>
          )
        }
        key="calendar"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/calendar/month`}>
          Calendar
        </NavLink>
      </Menu.Item>

      <SubMenu key="users" icon={!topMenu && <FeatherIcon icon="users" />} title="Users">
        <Menu.Item key="team">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/team`}>
            Team
          </NavLink>
        </Menu.Item>
        <Menu.Item key="grid">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/grid`}>
            Users Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="list">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/list`}>
            Users List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="grid-style">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/grid-style`}>
            Users Grid Style
          </NavLink>
        </Menu.Item>
        <Menu.Item key="grid-group">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/grid-group`}>
            Users Group
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addUser">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/add-user/info`}>
            Add User
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dataTable">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/dataTable`}>
            Users Table
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="contact" icon={!topMenu && <FeatherIcon icon="user-plus" />} title="Contact">
        <Menu.Item key="grid">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/grid`}>
            Contact Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="list">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/list`}>
            Contact List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addNew">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/addNew`}>
            Contact Create
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/note/all`}>
              <FeatherIcon icon="file-text" />
            </NavLink>
          )
        }
        key="note"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
          Note
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/to-do`}>
              <FeatherIcon icon="check-square" />
            </NavLink>
          )
        }
        key="to-do"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/to-do`}>
          To Do
        </NavLink>
      </Menu.Item> */}




    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
