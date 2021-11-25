import React, { useState, useEffect } from 'react'
import { marked } from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd' 
import axios from 'axios'
import serivePath from '../../config/apiUrl'
// CSS
import './addArticle.css'

const { Option } = Select
const { TextArea } = Input

export default function AddArticle(props) {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   // 文章标题

    const [articleContent , setArticleContent] = useState('')  // markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') // html内容

    const [introducemd, setIntroducemd] = useState()            // 简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') // 简介的html内容

    const [showDate, setShowDate] = useState()   // 发布日期
    // const [updateDate, setUpdateDate] = useState() // 修改日志的日期

    const [typeInfo , setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') // 选择的文章类别

    marked.setOptions({
      renderer: marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false
    })

    // 文本区域监听实时转换markdown显示
    const changeContent = e => {
      setArticleContent(e.target.value)
      const html = marked(e.target.value)
      setMarkdownContent(html)
    }
    
    // 文本区域监听实时转换标题介绍内容
    const changeIntroduce = e => {
      setIntroducemd(e.target.value)
      const html = marked(e.target.value)
      setIntroducehtml(html)
    }

    // 获得文章信息类别选择数据
    const getTypeInfo = () => {
      axios({
        method: 'GET',
        url: serivePath.getTypeInfo,
        withCredentials: true
      }).then(response => {
        const { data } = response.data
        if(data === '没有登录') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(data)
        }
      })
    }

    // 获得id并修改数据
    const getArticleById = id => {
      axios(serivePath.getArticleById + id, {
        withCredentials: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(response => {
        const item = response.data.data[0]
        setArticleTitle(item.title)
        setArticleContent(item.article_content)

        const html = marked(item.article_content)
        setMarkdownContent(html)

        setIntroducemd(item.introduce)

        const tempInt = marked(item.introduce)
        setIntroducehtml(tempInt)

        setShowDate(item.addTime)
        setSelectType(item.typeId)
      })
    }

    useEffect(() => {
      getTypeInfo()
      // 获得文章的id
      const tmpId = props.match.params.id
      if(tmpId) {
        setArticleId(tmpId)
        getArticleById(tmpId)
      }
    }, [])

    // 同步文章类型
    const selectTypeChange = value => {
      setSelectType(value)
    }

    // 添加文章
    const saveArticle = () => {
      if (selectedType === '请选择类型' || !articleTitle || !showDate || !introducehtml || !articleContent) {
        message.error('请检查输入内容')
        return;
      }
      const dataProps = {}
      dataProps.type_id = selectedType
      dataProps.title = articleTitle
      dataProps.article_content = articleContent
      dataProps.introduce = introducehtml
      // 是否考虑服务端去做日期
      dataProps.addTime = (new Date(showDate.replace(/-/g, '/')).getTime()) / 1000
      
      
      // 0表示文字是新建
      if (articleId === 0) {
        // 访问次数为0
        dataProps.view_count = 0
        axios({
          method: 'POST',
          url: serivePath.addArticle,
          data: dataProps,
          withCredentials: true
        }).then(response => {
          // 获取ID用于更新数据
          const { insertId, insertSuccess } = response.data
          // 更新ID
          setArticleId(insertId)
          if (insertSuccess) {
            message.success('文章添加成功')
          } else {
            message.error('文章添加失败，请刷新重试')
          }
        })
      } else {
        // 需要更新的id
        dataProps.id = articleId
        axios({
          method: 'POST',
          url: serivePath.updateArticle,
          data: dataProps,
          withCredentials: true
        }).then(response => {
          if (response.data.updateSuccess) {
            message.success('文章更新成功')
            props.history.push('/index/list')
          } else {
            message.error('文章更新失败')
          }
        })
      }
      
    }

    return (
      <div>
        <Row gutter={5}>
          <Col span={18}>
            <Row gutter={10}>
              <Col span={20}>
                <Input
                  value={articleTitle}
                  placeholder="博客标题"
                  size="large"
                  onChange={ e => setArticleTitle(e.target.value) }
                />
              </Col>
              <Col span={4}>
                 &nbsp;
                <Select defaultValue={selectedType} size="large" onChange={selectTypeChange} key={selectedType}>
                  {
                    typeInfo.map((item, index) => {
                      return <Option value={item.id} key={item.id}>{item.typeName}</Option>
                    })
                  }
                </Select>
              </Col>
            </Row>
            <br />
            <Row gutter={10}>
              <Col span={12}>
                <div className="tip-title">markdown解析前</div>
                <TextArea
                  className="markdown-content"
                  value={articleContent}
                  rows={35}
                  placeholder="文字内容"
                  onChange={changeContent}
                />
              </Col>
              <Col span={12}>
                <div className="tip-title">markdown解析后</div>
                <div className="show-html"
                  dangerouslySetInnerHTML={{__html: markdownContent}}
                >
                </div>
              </Col>
            </Row>
          </Col>
          {/* right */}
          <Col span={6}>
            <Row>
              <Col span={24}>
                <Button type="default" size="large">暂存发布</Button>
                <Button type="primary" size="large" style={{marginLeft: 10}} onClick={saveArticle}>发布我吧</Button>
              </Col>
              <Col span={24}>
                <br />
                <div className="tip-title">文章简介</div>
                <TextArea
                  rows={4}
                  placeholder="文章简介"
                  onChange={changeIntroduce}
                  value={introducemd}
                />
                <br />
                <br />
                <div className="introduce-html"
                  dangerouslySetInnerHTML= {{ __html: introducehtml }}
                >
                </div>
              </Col>
              <Col span={12}>
                <div className="tip-title">发布日期</div>
                <div className="date-select">
                  <DatePicker
                    onChange={(data, dataString) => setShowDate(dataString) }
                    placeholder="发布日期"
                    size="large"
                  ></DatePicker>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>  
    )
}