import React, { useEffect, useState } from 'react'
// 以外的全球CSS不能从文件导入您的自定义<应用>。由于全球的样式表,为了避免冲突,请将所有自身的全球/ _app.js CSS导入页面。或转换导入组件级CSS (CSS模块)。
import { HomeOutlined, PlayCircleOutlined, FilePdfOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Col, Menu } from 'antd'
// import Link from 'next/link'
import axios from 'axios'
// url
import servicePath from '../../config/baseUrl'
import router from 'next/router'

function Header() {

    const [navArray, setNavArray] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(servicePath.getTypeInfo)
        setNavArray(result.data.data)
      }
      fetchData()
    }, [])

    const handleClick = e => {
      // console.log(e.key, e.key === '0')
      // e.key === '0'
      if(e.key == 0) {
        router.push('/')
      } else {
        router.push(`/list?id=${e.key}`)
      }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">HEISMING</span>
                    <span className="header-text">前端新手</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={12} xl={10}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            首页
                        </Menu.Item>
                        <Menu.Item key="1">
                            <PlayCircleOutlined />
                            视频
                        </Menu.Item>
                        <Menu.Item key="2">
                            <FilePdfOutlined />
                            文章
                        </Menu.Item>
                        <Menu.Item key="3">
                            <SmileOutlined />
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header