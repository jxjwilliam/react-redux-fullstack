import React from 'react';

const FetchError = ({message, onRetry}) => (
  <div className="well">
    <p>Could not fetch TODOs: {message}</p>
    <button
      type="button"
      className="btn btn-warning"
      onClick={onRetry}>
    </button>
  </div>
)

export default FetchError;