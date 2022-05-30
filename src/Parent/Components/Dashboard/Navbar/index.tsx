import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import styles from './style.module.scss'
import { Link, Route, Routes, useLocation, useParams, } from 'react-router-dom';
import Profile from '../Profile';
import Todo from '../Todo';
import Weather from '../Weather';
import Cart from '../Cart';
import { observer } from 'mobx-react-lite';
import DetailPage from './../Todo/DetailPage/index';

const Navbar = observer(() => {
  function ProfilePage() {
    // Get the userId param from the URL.
    let { userId } = useParams();
    // ...
    return <div>HELLO WORD</div>
  }
  
  const { Header, Sider, Content } = Layout;
  const path = useLocation()
  const [selectedKey, setSelectedKey] = useState('/')
 
  
    return (
      <Layout>
        <Sider className={styles.sliderContainer}>
          <div className={styles.logo}>
            DASHBOARD
            </div>
            <div className={styles.menu}>
            <Menu
             defaultSelectedKeys={[selectedKey]}>
            <Menu.Item key='/'><Link to="/">Profile</Link></Menu.Item>
            <Menu.Item key='/todo'><Link to="todo">Todo</Link></Menu.Item>
            <Menu.Item key='/cart'><Link to="cart">Cart</Link></Menu.Item>
            <Menu.Item key='/weather'><Link to="weather">Weather</Link></Menu.Item>
           </Menu>
           </div>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          </Header>
          <Content
            className="site-layout-background"
            style={{

            }}
          >
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="todo" element={<Todo />} />
               {/*@ts-ignore */}
              <Route path="cart" element={<Cart />} />
              <Route path="weather" element={<Weather />} />
              <Route path=":keyword"  element={<DetailPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
  )
})

export default Navbar;
