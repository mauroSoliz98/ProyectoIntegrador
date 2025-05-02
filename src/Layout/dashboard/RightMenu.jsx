import React from 'react'
import {  Avatar, Space, Typography } from 'antd'
const {Text} = Typography

const RightMenu = ({mode}) => {
    
    
      return (
        <Space wrap size={16} className='hover:bg-blue-500 p-2 rounded-md'>
          <Avatar shape="square" size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"  />
          <Text strong className='hover:text-white' >Admin2025</Text>
        </Space>
      )
};

export default RightMenu