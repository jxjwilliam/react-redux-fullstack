import React, {Component}  from 'react'
import { connect } from 'react-redux'

const Header = (props) => (
  <header className='app-header'>
    { props.children }
  </header>
)

const Navigation = () => <nav>Navigation</nav>

const SearchBar = () => <div>SearchBar</div>

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {
        firstName: 'William',
        lastName: 'Jiang'
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Header>
          {this.state.admin.firstName ? (
            <div>
              <h3>{this.state.admin.firstName} {this.state.admin.lastName}</h3>
              <Navigation/>
            </div>
          ) : (
            <div>
              <div> Not Login</div>
              <SearchBar/>
            </div>
          )}
        </Header>
      </div>
    )
  }
}

Home = connect()(Home);
export default Home;