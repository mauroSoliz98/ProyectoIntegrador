import React, { useState, useEffect } from 'react';
import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu">
      <div className="menu__logo">
        <a href="">Logo</a>
      </div>
      <div className="menu__container">
        {!isMobile && (
          <>
            <div className="menu_left">
              <LeftMenu mode="horizontal" />
            </div>
            <div className="menu_rigth">
              <RightMenu mode="horizontal" />
            </div>
          </>
        )}
        {isMobile && (
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <AlignRightOutlined />
          </Button>
        )}
        <Drawer
          title="Menú"
          placement="left"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          open={visible}
          width="50%" // Ajusta el ancho del Drawer
        >
          <div style={{ overflow: 'auto' }}> {/* Evita el desbordamiento */}
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;