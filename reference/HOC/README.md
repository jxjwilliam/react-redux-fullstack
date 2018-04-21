# Higher Order Components

Screencast video:
https://www.youtube.com/watch?v=LTunyI2Oyzw


# Outline

- What is a Higher Order Component
- Render highjacking
- Usage as a decorator
- Using Curried functions for configuration
- Manipulating Props

# Decorator
```javascript
import React, { Component, PropTypes } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import LoadingHOC from './HOC/LoadingHOC'
import './ContactsApp.css';

@LoadingHOC('contacts')
class ContactsApp extends Component {
  state = {
    filterText: ''
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string
      })
    ).isRequired,
    loadingTime: PropTypes.string
  }

  handleUserInput = (searchTerm) => {
    this.setState({filterText: searchTerm})
  }

  render() {
    const { loadingTime } = this.props;
    return(
      <div className="contactApp">
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
        <p>Loading time {loadingTime} seconds</p>
      </div>
    )
  }
}


export default ContactsApp;
//LoadingHOC('contacts')(ContactsApp);

```