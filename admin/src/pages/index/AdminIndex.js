import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Row, Col } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Route } from 'react-router-dom'
// 组件
import AddArticle from '../addArticle/AddArticle';
import ArtcleList from '../artcleList/ArtcleList';
import Error from '../404/Error';
import IndexPage from '../indexPage/IndexPage';

import './index.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(props) {
 
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrumbArray, setBreadcrumbArray] = useState(['首页'])

  function onCollapse(collapsed) {
    setCollapsed(collapsed)
  }

  // 处理sider的点击
  const handleClickArtcle = e =>{
    const key = e.key
    if(key === 'add') {
      props.history.push('/index/add')
      setBreadcrumbArray(['首页', '添加文章'])
    } else if(key === 'list') {
      props.history.push('/index/list')
      setBreadcrumbArray(['首页', '查询文章'])
    } else if(key === 'pause'){
      props.history.push('/index/404')
      setBreadcrumbArray(['首页', '暂定'])
    } else if(key === 'message') {
      props.history.push('/index/404')
      setBreadcrumbArray(['首页', '留言管理'])
    } else if(key === 'index') {
      props.history.push('/index')
      setBreadcrumbArray(['首页'])
    }
  }

  // 
  const handleToChangeBGColor = () => {
    document.style.background = '#000'
  }

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" >HEISMING</div>
          <Menu theme="dark" defaultSelectedKeys={['index']} mode="inline" onClick={handleClickArtcle}>
            <Menu.Item key="index" icon={<PieChartOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="pause" icon={<DesktopOutlined />}>
              暂定
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
              <Menu.Item key="add">添加文章</Menu.Item>
              <Menu.Item key="list">查询文章</Menu.Item>
            </SubMenu>
            <Menu.Item key="message" icon={<FileOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: '0 16px' }} >
            <Row>
              <Col span={23}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                {
                  breadcrumbArray.map((item, index) => {
                    return (
                      <Breadcrumb.Item key={index}>{index !== breadcrumbArray.length - 1 ?<a href='/index/'>{item}</a> : item}</Breadcrumb.Item>
                    )
                  })
                }
                </Breadcrumb>
              </Col>
              <Col span={1}>
                <Dropdown overlay={(<Menu>
                <Menu.Item key="1" onClick={handleToChangeBGColor}>
                  <a href="#">
                    切换主题
                  </a>
                </Menu.Item>
                <Menu.Item  disabled key="2">
                  <a href="m">
                    切换语言
                  </a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a href="https://github.com/heisming">
                    github
                  </a>
                </Menu.Item>
                  <Menu.Item danger key="4">
                    <a href="/">
                      退出登录
                    </a>
                  </Menu.Item>
                </Menu>)}>
                  <div className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color: '#1890ff'}}>
                    操作
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '16px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                  {/* 嵌套路由 */}
                  <Route path="/index" exact component={IndexPage}/>
                  <Route path="/index/add" exact component={AddArticle} />
                  <Route path="/index/list" exact component={ArtcleList} />
                  <Route path="/index/add/:id" exact component={AddArticle} />
                  <Route path="/index/404" exact component={Error} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>HEISMING.COM</Footer>
        </Layout>
      </Layout>
    );
}
