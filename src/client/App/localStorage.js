const {fromJS} = require('immutable');

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        let newState = {};
        let oldState = JSON.parse(serializedState);
        for (let key in oldState){
            newState[key] = fromJS(oldState[key]);
        }
        return newState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};