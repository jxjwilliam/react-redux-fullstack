import React from 'react'
import {Link} from 'react-router-dom'
import FooterConfig from '../../etc/footer-config'

const FooterItem = (item) => (
  <div className="flex-item">
    <button className="btn btn-default">
      <Link style={{display:'block'}} to={item.link}>
        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
        {  `${item.name}`}
      </Link>
    </button>
  </div>
)

const Footer = ({footer}) => {
  let items = FooterConfig.map((item, i) => (
    <FooterItem {...item} key={'f_'+i}/>
  ))

  return (
    <footer style={{marginTop:20}}>
      <div className="flex-container">
        {items}
      </div>
      <p {...footer}>&copy; 2017-2018 William Jiang</p>
    </footer>
  )
}

export default Footer