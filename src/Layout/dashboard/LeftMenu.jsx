import React from 'react'
import { Menu } from 'antd'
import itemsNav from '../_navs'
import { NavLink } from 'react-router'

const LeftMenu = ({mode}) => {
    
      return (
            <Menu mode={mode} items={itemsNav} />
      );
}

export default LeftMenu