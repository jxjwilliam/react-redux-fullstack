//redux-what-is-the-correct-way-to-filter-a-data-array-in-reducer
//creating a "selector" function, as demonstrated in the Redux shopping cart example.

function mapStateToProps(state) {
  const { items, searchText } = state.searchSimple;
  return {
    filteredItems: items.filter((item) => item.startsWith(searchText))
  };
}

//how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
const store = configureStore()
//then in router:
//  <Route path='/myRoutePath' component={MyRouteHandler}
// onEnter={()=>store.dispatch(myRouteEnterAction())} />


//firing-redux-actions-in-response-to-route-transitions-in-react-router/
import { Observable } from 'rx'
function observableFromStore(store) {
  return Observable.create(observer =>
      store.subscribe(() => observer.onNext(store.getState()))
  )
}
const didLogin$ = state$
  .distinctUntilChanged(state => !state.loggedIn && state.router.path === '/login')
  .filter(state => state.loggedIn && state.router.path === '/login');

didLogin$.subscribe({
  whatever: router.transitionTo('/success')
});

//react-redux-should-all-component-states-be-kept-in-redux-store
// general steps:
//1. component:
//  button: onClick={()=>{dispatch(changeColor())}}
//  color: this.props.color ? blue : red
//2. container:
connect(mapStateToProps)(component)
//3. actioncreator:
function changeColor() {
  return {type: 'CHANGE_COLOR'}
}
//4. reducer:
//switch(){
//  case 'CHANGE_COLOR':
//    return {color: true}


//how-to-optimize-small-updates-to-props-of-nested-component-in-react-redux
const makeMapStateToProps = (initialState, initialOwnProps) => {
  const { id } = initialOwnProps
  const mapStateToProps = (state) => {
    const { todos } = state
    const todo = todos.byId[id]
    return {
      todo
    }
  }
  return mapStateToProps
}
export default connect(
  makeMapStateToProps
)(TodoItem)

const ConnectedRepo = connect(
  (initialState, initialOwnProps) => (state) => ({
    repo: state.reposById[initialOwnProps.repoId]
  })
)(Repo);


//////// CONNECT //////

export default connect(
    state => ({todos: state.todos}),
  {onTodoClick: toggleTodo, reveiveTodos}
)(TodoListContainer)


connect = Object.assign({}, ownProps, stateProps, dispatchProps);

//react-redux-mapdispatchtoprops-not-receiving-mapstatetoprops
connect({
  mapStateToProps,
  null, // passing null instead of mapDispatchToProps will return an object with the dispatch method
  mergeProps
})(ToggleFollowButton)

function mapDispatchToProps(dispatch) {
  return {
    myAction: () => dispatch(actions.myAction()),
  };
};

connect(
  (state, ownProps) => ({}),
  (dispatch, ownProps) => ({})
)(_Table);


//react-redux-architecting-table-actions-and-reducers
//<Th key={key} onClickSort={onClickSort(col.id)}>{col.name}</Th>
const Th = ({onClickSort, children}) => (
  <th>
    <a href="#sort" onClickSort={event => {
      event.preventDefault();
      onClickSort(event);
    }}>{children}</a>
  </th>
);

connect(
  mapStateToProps,
  (dispatch, {tableId}) => ({
    onClickSort: columnId => event => {
      dispatch(actions.tableSortColumn(tableId, columnId));
      // example: if user clicks 'last_name' column in customers table
      // dispatch(actions.tableSortColumn('customers', 'last_name'));
    },
    onClickNextPage: event => {
      dispatch(actions.tableNextPage(tableId))
    }
  })