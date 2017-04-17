import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUsers, selectUser} from '../actions/userAction'

const UseDetail = ({user}) => {
    if (user && Object.keys(user).length > 0) {
        return (
            <div>
                <h3>{user.firstName} {user.lastName}</h3>

                <p className="well">
                    <label>Email: {user.email}</label>
                    <label>Phone: {user.phone}</label>
                    <label>DOB: {user.dob}</label>
                </p>
            </div>
        );
    }
    return <div>Click a user item to get detail.</div>
}

class Users extends Component {
    /**
     *  If you need to load data from a remote endpoint, this is a good place to instantiate
     *  the network request. Setting state in this method will trigger a re-rendering.
     * for local state, it works properly:
     * superagent.get('/api/todos').set('Accept', 'application/json').end((err, res) => {
	 * 	this.setState({users: res.body});})
     */
    componentDidMount() {
        this.props.getUsers(); // store.dispatch({type: 'USER_FETCH'});
    }

    /**
     * userDetail = {
   *   dob: "16/07/2017", email:"risus.In.mi@estNunclaoreet.edu"
   *   firstName:"Yardley", lastName:"Ashley", phone:"(729) 330-8038"
   * }
     */
    render() {
        const {userList, userDetail} = this.props;

        let users;
        if (userList === null || typeof userList === 'undefined') {
            users = (
                <p className="well">Loading...</p>
            )
        }
        else if (Array.isArray(userList) && userList.length > 0) {
            users = userList.map((user, i) => (
                <li key={'user'+i}
                    onClick={()=>{this.props.selectUser(user)}}>
                    {user.firstName}, {user.lastName}
                </li>
            ));
        }
        else {
            users = <li>Not Available</li>;
        }

        return (
            <div>
                <h2>Users List</h2>
                <ol> {users} </ol>
                <hr/>
                <UseDetail user={userDetail}/>
            </div>
        )
    }
}

const mapStateToProps = (state, {params}) => ({
    userList: state.userList,
    userDetail: state.userDetail
})

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectUser,
        getUsers
    }, dispatch);
}

Users = connect(
    mapStateToProps,
    matchDispatchToProps
)(Users);

export default Users
