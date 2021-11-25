import 'antd/dist/antd.css'
import '../styles/comm.css'
import '../styles/index.css'
import '../styles/details.css'
// 组件中的css
import '../components/header/header.scss'
import '../components/author/author.scss'
import '../components/advert/advert.scss'
import '../components/footer/footer.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
