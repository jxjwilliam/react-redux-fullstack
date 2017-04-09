import superagent from 'superagent'

// every-click, a update counter api is triggered.
const updateCounter = (counter) => {
    superagent('/apu/counter')
        .send({counter: counter})
        .end((err, res) => {
            console.log('updateCounter:', res);
        });
}

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

export const increment = () => ({
    type: 'INCREMENT'
});

export const decrement = () => ({
    type: 'DECREMENT'
});