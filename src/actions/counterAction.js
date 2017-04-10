import superagent from 'superagent'

export const getCounter = () => (dispatch, getState) => {
    const counter = getState().counter;
    if (!counter || counter === 0) {
        superagent('/api/counter')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                dispatch({
                    type: 'LOAD_COUNTER',
                    payload: res.body.counter
                });
            });
    }
}

// every-click, a update counter api is triggered.
export const increment = () => (dispatch, getState) => {
    const counter = getState().counter + 1;
    superagent
        .put('/api/counter')
        .set('Accept', 'application/json')
        .send({counter: counter})
        .end((err, res) => {
            if (err) throw err;
            dispatch({
                type: 'INCREMENT'
            })
        });
};

// used for localStage without DB connection
const increment_local = () => ({
    type: 'INCREMENT'
});

export const decrement = () => (dispatch, getState) => {
    const counter = getState().counter - 1;
    superagent
        .put('/api/counter')
        .set('Accept', 'application/json')
        .send({counter: counter})
        .end((err, res) => {
            if (err) throw err;
            dispatch({
                type: 'DECREMENT'
            })
        })
}