import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import superagent from 'superagent'

const loadReposAction = (user) => {
  return (dispatch) => {
    //var url = 'https://api.github.com/users/' + user + '/repos';
    var url = '/api/delegate/github/' + user;
    dispatch(loadingChangedAction(true));

    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if (err) throw err;
        console.log(result.body);
        dispatch(loadingChangedAction(false));
        dispatch(addReposAction(result.body));
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

  handleSubmit(e) {
    e.preventDefault();
    let user = this.input.value.trim();
    this.props.userChangedAction(user);
    this.props.loadReposAction(user);
    //return false;
  }

  //componentDidMount() {
  //  this.props.loadReposAction();
  //}

  render() {
    const {github} = this.props
    let list;
    if (github.repos && github.repos.length > 0) {
      list = github.repos.map((r, i) => (
        <li className="list-group-item" key={r.id}>
          <h4><a href={r.html_url}>{r.full_name}</a></h4>

          <p>{r.description}</p>
        </li>
      ))
    }
    else if (github.repos.length === 0) {
      list = (
        <li className="list-group-item">
          <h3 className="alert alert-danger"> No Repository.</h3>
        </li>
      )
    }

    return (
      <div className="container row">
        <div className="jumbotron">
          <div className="container">
            <h1>Github Repository</h1>
          </div>
        </div>
        <div className="container">
          <form onSubmit={(e)=>this.handleSubmit(e)} className="form form-inline row" style={{marginBottom:15}}>
            <div className="form-group">
              <input type="text" placeholder="Enter github username" className="form-control"
                     ref={(input) => this.input = input}/>
            </div>
            <button className="btn btn-primary" type="submit">load</button>
          </form>
          <div id="loading" className="row alert alert-info hide">
            <i className="fa fa-spin fa-cog"></i> ...loading github...
          </div>
          <div className="row">
            <ul className="list-group">{list}</ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  github: state.github
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadReposAction,
    addReposAction,
    userChangedAction,
    loadingChangedAction,
  }, dispatch);
}

Delegate = connect(
  mapStateToProps,
  mapDispatchToProps
)(Delegate);

export default Delegate;
