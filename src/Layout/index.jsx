import React, { useState, useEffect } from 'react';
import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';


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

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-500 text-lg font-bold">
          <a href="#">Logo</a>
        </div>

        {/* Menú principal */}
        {!isMobile ? (
          <div className="flex w-full justify-between items-center">
            <div className="flex space-x-6">
              <LeftMenu mode="horizontal" />
            </div>
            <div className="flex space-x-4">
              <RightMenu mode="horizontal" />
            </div>
          </div>
        ) : (
          <Button className="bg-blue-500 text-white p-2 rounded-md" onClick={showDrawer}>
            <AlignRightOutlined />
          </Button>
        )}

        {/* Menú lateral en móvil */}
        <Drawer
          title="Menú"
          placement="left"
          closable={true}
          onClose={onClose}
          open={visible}
          width="50%"  // Ajuste para móviles
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;