import produceData from '../mockData/produce.json'
import { createSelector } from 'reselect'

const POPULATE = 'produce/POPULATE';
const TOGGLE_LIKE = 'produce/TOGGLE_LIKE';

export function populateProduce() {
  return {
    type: POPULATE,
    produce: produceData
  }
}

export function toggleLike(id) {
  return {
    type: TOGGLE_LIKE,
    id
  }
}

export const selectProduce = state => state.produce;
export const selectProduceArray = createSelector(selectProduce, (produce) => Object.values(produce));

export default function produceReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE: {
      const newState = {};
      action.produce.forEach(produce => newState[produce.id] = produce);
      return newState;
    }
    case TOGGLE_LIKE:
      return { ...state, [action.id]: { ...state[action.id], liked: !state[action.id].liked } }
    default:
      return state;
  }
}
