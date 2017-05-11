import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {fetchGames} from './actions'

const GamesList = ({games}) => {
  const emptyMessage = (
    <p className="alert alert-danger">There is no games yet in your collection.</p>
  )
  const gamesList = (
    <p>games list</p>
  )

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  )
}

class GamesPage extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="row">
        <h2>Games List</h2>
        <GamesList games={this.props.games}/>
      </div>
    )
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  games: state.games
})

export default connect(mapStateToProps, {fetchGames})(GamesPage);