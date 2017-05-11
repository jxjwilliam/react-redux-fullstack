//import fetch from 'isomorphic-fetch'

export const setGames = (games) => {
  return {type: 'SET_GAMES', games}
}

export const fetchGames = () => dispatch => {
  return fetch('/api/games')
    .then(res => res.json())
    .then(data => dispatch(setGames(data.games)))
}