import stripGetters from './stripGetters';

const createStateFactory = modelFactory => (prevState, nextState) => {
    const model = modelFactory();

    return Object.assign(model, stripGetters(prevState, model), nextState);
};

export default createStateFactory;
