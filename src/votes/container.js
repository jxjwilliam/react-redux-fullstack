import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actionCreators from './action'

const pair = ['Trainspotting', '28 Days Later'];

const Winner = ({props}) => (
  <div className="winner">
    Winner is {props.winner}!
  </div>
);

export class Vote extends Component {
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
};

export const Voting = React.createClass({
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner}/> :
        <Vote {...this.props} />}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);


class Results extends Component {
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

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}


export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);