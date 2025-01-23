import React, { useState } from 'react';
import Dashboard from './Contents/Dashboard';
import SideBar from './SideBar';
import SeeProducts from './Contents/Products';
import Orders from './Contents/Orders';
import Users from './Contents/Users';
import './Home.css';
import Category from './Contents/Category';


function Homepage() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');

    const renderActiveComponent = () => {
      switch (activeComponent) {
        case 'Dashboard':
          return <Dashboard />;
        case 'Products':
          return <SeeProducts />;
        case 'Orders':
          return <Orders />;
        case 'Users':
            return <Users />;
        case 'Category':
            return <Category />;
        default:
          return <Dashboard />;
      }
    }
  
    return (
      <div className='App'>
        <SideBar setActiveComponent={setActiveComponent} />
        <div className='content-container'>
          {renderActiveComponent()}
        </div>
      </div>
    );
  }


export default Homepage;