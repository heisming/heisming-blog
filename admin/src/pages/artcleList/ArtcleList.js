import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from "axios";
import serivePath from "../../config/apiUrl";

import './artcleList.css'

const { confirm } = Modal

export default function ArtcleList(props) {
    const [listData, setListData] = useState([])
    const getList = () => {
      axios({
        method: 'GET',
        url: serivePath.getArticleList,
        withCredentials: true,
        header: { 'Access-Control-Allow-Origin': '*' }
      }).then(responese => {
        setListData(responese.data.list)
      })
    }

    // delete artcle
    const deleteArtcle = id => {
      confirm({
        title: '确定要删除吗？',
        content: '点击确定将永久删除,并无法恢复',
        onOk() {
          axios(serivePath.deleteArtcle + id, { withCredentials: true }).then(() => {
            message.success('删除成功')
            // 其实可以改变listData中的数据来较少网络请求
            getList()
          })
        },
        onCancel() {
          message.success('安全操作')
        }
      })
    }

    // 修改文章
    const updateArticle = (id, checked) => {
      props.history.push('/index/add/' + id)
    }

    useEffect(() => {
      getList()
    }, [])

    return (
        <div>
          <List 
           header={
             <Row className="list-div">
                 <Col span={8}>
                     <b>标题</b>
                 </Col>
                 <Col span={3}>
                     <b>类别</b>
                 </Col>
                 <Col span={3}>
                     <b>发布时间</b>
                 </Col>
                 <Col span={3}>
                     <b>集数</b>
                 </Col>
                 <Col span={3}>
                     <b>浏览量</b>
                 </Col>
                 <Col span={4}>
                     <b>操作</b>
                 </Col>
             </Row>
           }
           bordered
           dataSource={listData}
           renderItem={item => (
               <List.Item>
                 <Row className="list-div">
                    <Col span={8}>
                      {item.title}
                    </Col>
                    <Col span={3}>
                      {item.typeName}
                    </Col>
                    <Col span={3}>
                      {item.addTime}
                    </Col>
                    <Col span={3}>
                    { item.part_count? <span>共{item.part_count}集</span> : '无' }
                    </Col>
                    <Col span={3}>
                      {item.view_count}
                    </Col>
                    <Col span={4}>
                      <Button type="primary" onClick={() => updateArticle(item.id)} style={{marginRight: 10}}>修改</Button>
                      <Button type="ghost" onClick={() => deleteArtcle(item.id)}>删除</Button>
                    </Col>
                 </Row>
               </List.Item>
           )}
          />
        </div>
    )
}