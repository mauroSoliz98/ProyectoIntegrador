import React from 'react'
import { Menu } from 'antd'

const LeftMenu = ({mode}) => {
    const items = [
        { key: 'home', label: <a href="#">Home</a> },
        {
          key: 'blogs',
          label: 'Blogs',
          children: [
            {
              key: 'item1',
              label: 'Item 1',
              children: [
                { key: 'setting:1', label: 'Option 1' },
                { key: 'setting:2', label: 'Option 2' },
              ],
            },
            {
              key: 'item2',
              label: 'Item 2',
              children: [
                { key: 'setting:3', label: 'Option 3' },
                { key: 'setting:4', label: 'Option 4' },
              ],
            },
          ],
        },
        { key: 'contact', label: <a href="#">Contact Us</a> },
      ];
    
      return <Menu mode={mode} items={items} />;
}

export default LeftMenu