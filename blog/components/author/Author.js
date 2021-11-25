import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons'

export default function Author() {
    return (
      <div className="author-div comm-box">
        <div><Avatar size={100} src="http://www.heisming.com/assets/images/small-head.jpg"></Avatar></div>
        <div className="author-introduction">
            天下第一
        </div>
        <Divider>联系方式</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
        <Avatar size={28} icon={<QqOutlined />} className="account"></Avatar>
        <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
        <Avatar size={28} icon={<MailOutlined />} className="account"></Avatar>
      </div>
    )
}