import React, { Component, PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Tabs, Tab, Button } from 'react-bootstrap';
import Helmet from 'react-helmet'

//const AppTab = ({ i, tab }) => (
//  <Tab eventKey={i} title={tab}>{tab}</Tab>
//)
//static propTypes = {
//  children: PropTypes.object.isRequired
//}

class AppTabs extends Component {

  render() {
    const TabList = [
      {title: 'Home', link: '/home'},
      {title: 'Todos', link: '/todos'},
      {title: 'About', link: '/about'},
      {title: 'Counter', link: '/counter'},
      {title: 'Contact Us', link: '/contact'},
      {title: 'Others', link: '/home'}
    ];
    return (
      <div>
        <Nav navbar>
          {
            TabList.map((tab, i) => (
              <LinkContainer key={tab.title + '_' + i} to={tab.link}>
                <NavItem key={i} eventKey={i}>{tab.title}</NavItem>
              </LinkContainer>
            ))
          }
        </Nav>

        <div className="tabContant">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AppTabs;