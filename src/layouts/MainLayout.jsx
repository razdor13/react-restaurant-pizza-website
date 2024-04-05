import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      
        <Outlet />
      
      <Footer/>
    </div>
  );
};

export default MainLayout;