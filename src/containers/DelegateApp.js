import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import superagent from 'superagent'

const loadReposAction = (user) => {

  return (dispatch, getState) => {
    var state = getState();
    var url = "https://api.github.com/users/williamjxj/repos";

    url = '/api/delegate/github/williamjxj';

    dispatch(loadingChangedAction(true));

    superagent
//      .get('/api/delegate/jsonplaceholder')
      .get('/api/delegate/github/jxjwilliam')
      .set('Accept', 'application/json')
//      .withCredentials()
      .set('User-Agent', 'williamjxj')
      .end((err, result) => {

        console.log('could I print here????', result.json());

        dispatch(loadingChangedAction(false));

        //dispatch(addReposAction(result.json()));

      });
  }
}

//1. Action creators
const addReposAction = jsonResult => ({
  type: "ADD_TWEETS",
  repos: jsonResult
});
const userChangedAction = value => ({
  type: "USER_CHANGED",
  value: value
});
const loadingChangedAction = isLoading =>({
  type: "IS_LOADING",
  isLoading: isLoading
});

class Delegate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://api.github.com/users/",
      repo: {
        full_name: '',
        stargazers_count: 0,
        open_issues: 0
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let user = this.input.value.trim();
    this.props.userChangedAction(user);
    this.props.loadReposAction(user);
    return false;
  }

  render() {
    const {repos} = this.props
    console.log('render:', this.props);
    return (
      <div className="container row">
        <div className="jumbotron">
          <div className="container">
            <h1>Github Repository</h1>
          </div>
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="form form-inline row" style={{marginBottom:15}}>
            <div className="form-group">
              <input type="text" placeholder="Enter github username" className="form-control"
                     ref={(input) => this.input = input}/>
            </div>
            <button className="btn btn-primary" type="submit">load</button>
          </form>
          <div id="loading" className="row alert alert-info hide">
            <i className="fa fa-spin fa-cog"></i> ...loading repos...
          </div>
          <div className="row">
            <ul className="list-group"></ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  repos: state.repos
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadReposAction,
    addReposAction,
    userChangedAction,
    loadingChangedAction
  }, dispatch);
}

Delegate = connect(
  mapStateToProps,
  mapDispatchToProps
)(Delegate);
export default Delegate;
