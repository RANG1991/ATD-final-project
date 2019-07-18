const {fromJS} = require('immutable');

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return {app: fromJS(JSON.parse(serializedState).app),
            currentUser: fromJS(JSON.parse(serializedState).currentUser),
            navigation: fromJS(JSON.parse(serializedState).navigation),
            newReview:fromJS(JSON.parse(serializedState).newReview)};
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};