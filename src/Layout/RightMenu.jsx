import React from 'react'
import { Menu } from 'antd'

const RightMenu = ({mode}) => {
    const items = [
        { key: 'mail', label: <a href="#">Signin</a> },
        { key: 'app', label: <a href="#">Signup</a> },
      ];
    
      return <Menu mode={mode} items={items} />;
};

export default RightMenu