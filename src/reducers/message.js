import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
    status: 'INIT',
    id: '',
    error: -1
  },
  get: {
    status: 'INIT',
    message: {},
    error: -1
  }
}

export default function message(state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }

  switch (action.type) {
    case types.DATA_POST:
      return update(state, {
        post: {
          status: {$set: 'WAITING'},
          id: {$set: ''},
          error: {$set: -1}
        }
      })
    case types.DATA_POST_SUCCESS:
      // console.log('data post success reducers', action.id)
      return update(state, {
        post: {
          status: {$set: 'SUCCESS'},
          id: {$set: action.data}
        }
      })
    case types.DATA_POST_FAILURE:
      return update(state, {
        post: {
          status: {$set: 'FAILURE'},
          error: {$set: action.error}
        }
      })
    case types.DATA_GET: 
      return update(state, {
        get: {
          status: {$set: 'WAITING'},
          error: {$set: -1}
        }
      })
    case types.DATA_GET_SUCCESS:
      console.log('data get success reducers', action)
      return update(state, {
        get: {
          status: {$set: 'SUCCESS'},
          message: Object.assign({}, action.data)
        }
      })
    case types.DATA_GET_FAILURE:
      return update(state, {
        get: {
          status: {$set: 'FAILURE'},
          error: {$set: action.error}
        }
      })
    default:
      return state;
  }
}