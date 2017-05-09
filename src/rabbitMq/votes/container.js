import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actionCreators from './action'
import entries from './entries.json'

const pair = ['Trainspotting', '28 Days Later'];

const Winner = ({props}) => (
  <div className="winner">
    Winner is {props.winner}!
  </div>
);

export class Vote extends Component {
  constructor(props) {
    super(props)
    this.getPair = this.getPair.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.hasVotedFor = this.hasVotedFor.bind(this)
  }

  getPair() {
    return this.props.pair || [];
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  render() {
    return <div className="voting">
      {this.getPair().map(entry =>
          <button key={entry}
                  disabled={this.isDisabled()}
                  onClick={() => this.props.vote(entry)}>
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null}
          </button>
      )}
    </div>;
  }
}

export const Voting = ({props}) => ( <div>
    {this.props.winner ?
      <Winner ref="winner" winner={this.props.winner}/> :
      <Vote {...this.props} />}
  </div>
)

const mapStateToProps = (state) => ({
  pair: state.vote.pair,
  hasVoted: state.hasVoted,
  winner: 'state.get-winner'
})

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);


class Results extends Component {
  constructor(props) {
    super(props)
    this.getPair = this.getPair.bind(this)
    this.getVotes = this.getVotes.bind(this)
  }

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }

  render() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner}/> :
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry =>
              <div key={entry} className="entry">
                <h1>{entry}</h1>

                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
          )}
        </div>
        <div className="management">
          <button ref="next"
                  className="next"
                  onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>;
  }
}

export const ResultsContainer = connect(
  (state) => {
    return {
      pair: state.vote.pair,
      tally: state.vote.tally,
      winner: 'state.winner'
    }
  },
  actionCreators
)(Results);