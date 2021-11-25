import React, {useState} from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import servicePath from '../../config/apiUrl'

import './login.css'
import 'antd/dist/antd.css'

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
      setIsLoading(true)
      // setTimeout(() => {setIsLoading(false)},1000)  
      if (!username || !password) {
        message.error('用户名或密码不正确')
        setIsLoading(false)
      } else {
        try {
          // axios.post(servicePath.login, {username, password})
          axios({ method: 'POST', url: servicePath.login, data: { username, password }, withCredentials: true })
          .then(response => {
            // 成功的处理逻辑 
            // console.log(response.data)
            // 修改为成功code = 0 失败code = -1
            if (response.data.data === '登录成功') {
              message.success('登录成功')
              console.log(response.data.openId)
              localStorage.setItem('openId', response.data.openId)
              window.location = '/index'
            } else {
              message.error('登录失败')
            }
            setIsLoading(false)
          }).catch(err => {
            message.error(err.toString())
            setIsLoading(false)
          })
        } catch (error) {
          message.error(error)    
          setIsLoading(false)       
        }
      }
    }
    return (
      <div className="login-div">
          <Spin tip="Loading..." spinning={isLoading}>
              <Card title="HEISMING blog System" bordered={true} style={{width: 400}}>
                  <Input
                    id="userName"
                    size="large"
                    placeholder="Enter You username"
                    prefix={<UserOutlined style={{color: 'rgba(0, 0, 0, .25'}}/>}
                    onChange={e => { setUsername(e.target.value) }}
                  />
                  <br/>
                  <br/>
                  <Input
                    id="passWord"
                    size="large"
                    type="password"
                    placeholder="Enter You password"
                    prefix={<UserOutlined style={{color: 'rgba(0, 0, 0, .25'}}/>}
                    onChange={e => { setPassword(e.target.value) }}
                  />
                  <br/>
                  <br/>
                  <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
              </Card>
          </Spin>
      </div>
    )
}