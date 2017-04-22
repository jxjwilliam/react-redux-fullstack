import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash'
import {getUsers, updateUser, saveUser, deleteUser} from '../actions/userAction'
import EditModal from '../components/ModalForm'

const prevAction = (userList) => ({type: 'PREV_USERS', payload: userList});
const nextAction = (userList) => ({type: 'NEXT_USERS', payload: userList});
const sortAction = (sortBy, seq) => ({type: 'SORT_USERS', sortBy: sortBy, seq: seq});


// merge the 2 sorts into 1.
const SortingAsc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name}
     onClick={() => { sort(name, 'asc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet"></span>
  </a>
)
const SortingDesc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name + ' desc'}
     onClick={() => { sort(name, 'desc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet-alt"></span>
  </a>
)

const Header = ({sort, seq}) => (
  <thead>
  <tr>
    <th>#</th>
    <th>First Name &nbsp;
      <SortingAsc sort={sort} name="firstName"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="firstName"/>
    </th>
    <th>Last Name &nbsp;
      <SortingAsc sort={sort} name="lastName"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="lastName"/>
    </th>
    <th>Email&nbsp;
      <SortingAsc sort={sort} name="email"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="email"/>
    </th>
    <th>Phone&nbsp;
      <SortingAsc sort={sort} name="phone"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="phone"/>
    </th>
    <th>DOB&nbsp;
      <SortingAsc sort={sort} name="dob"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="dob"/>
    </th>
    <th>Operation</th>
  </tr>
  </thead>
)

const Detail = ({idx, user, onEdit, onDelete}) => {
  return (
    <tr>
      <td scope="row">{idx + 1}</td>
      <td><a href="#" onClick={()=>onEdit(user._id)}>{user.firstName}</a></td>
      <td><a href="#" onClick={()=>onEdit(user._id)}>{user.lastName}</a></td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.dob}</td>
      <td>
        <button className="btn btn-warning"
                onClick={()=>onEdit(user._id)}
                title={'eidt ' + user.name}>
          <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
        <button className="btn btn-danger"
                onClick={()=>onDelete(user._id)}
                title={'remove ' + user.name}>
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  )
}


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false, user: {}}
    this.editModal = this.editModal.bind(this);
    this.doUser = this.doUser.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false, user: {}});
  }

  /**
   *  If you need to load data from a remote endpoint, this is a good place to instantiate
   *  the network request. Setting state in this method will trigger a re-rendering.
   * for local state, it works properly:
   * superagent.get('/api/todos').set('Accept', 'application/json').end((err, res) => {
	 * 	this.setState({userList: res.body});})
   */
  componentDidMount() {
    this.props.getUsers(); // store.dispatch({type: 'FETCH_USERS'});
  }

  editModal(id) {
    let theUser = this.props.userList.find(user=> user._id === id);
    this.setState({user: theUser, showModal: true});
  }

  deleteModal(id) {
    let theUser = this.props.userList.find(user=> user._id === id);
    if (confirm('are you sure to delete this user?')) {
      this.props.deleteUser(theUser);
    }
    else {
      this.setState({showModal: false, user: {}});
    }
  }

  areEqualShallow(a, b) {
    for (let key in a) {
      if (!(key in b) || a[key] !== b[key]) {
        return false;
      }
    }
    for (let key in b) {
      if (!(key in a)) {
        return false;
      }
    }
    return true;
  }

  doUser(values) {
    if (this.areEqualShallow(values, this.state.user)) {
      console.log('doUser - nothing change: values === this.state.user');
      this.setState({showModal: false, user: {}});
      return false;
    }

    if (Object.keys(this.state.user).length === 0) {
      this.props.saveUser(values);
    }
    else {
      //var newUser = Object.assign(this.state.user, values); //this.props.modelform
      this.props.updateUser(values);
    }
    this.setState({showModal: false, user: {}})
    // what need to dispatch? return this.props.dispatch();
  }

  /**
   * userDetail = {
   *   dob: "16/07/2017", email:"risus.In.mi@estNunclaoreet.edu"
   *   firstName:"Yardley", lastName:"Ashley", phone:"(729) 330-8038"
   * }
   */
  render() {
    const {userList} = this.props;

    if (userList === null || typeof userList === 'undefined' || userList.length === 0) {
      return <p className="well">Loading...</p>
    }

    return (
      <div className="container row">
        <button className="btn btn-success" onClick={this.open}>Add User</button>
        <table className="table table-bordered">
          <colgroup>
            <col className="col-md-1"/>
            <col className="col-md-2"/>
            <col className="col-md-2"/>
            <col className="col-md-2"/>
            <col className="col-md-2"/>
            <col className="col-md-1"/>
            <col className="col-md-2"/>
          </colgroup>
          <Header sort={this.props.sortAction}/>
          <tbody>
          {this.props.userList.map((user, i) => (
            <Detail
              key={i}
              onEdit={this.editModal}
              onDelete={this.deleteModal}
              user={user}
              idx={i}
              />
          ))}
          </tbody>
        </table>
        <div className="modal">
          <EditModal show={this.state.showModal} close={this.close} onUpdate={this.doUser} user={this.state.user}/>
        </div>
      </div>
    )
  }
}

// the following property works, but no useful.
//  modelform: state.form.editForm
const mapStateToProps = (state, {params}) => ({
  userList: state.userList,
});

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsers, updateUser, saveUser, deleteUser,
    prevAction, nextAction, sortAction, dispatch
  }, dispatch);
}

Users = connect(
  mapStateToProps,
  matchDispatchToProps
)(Users);

export default Users
