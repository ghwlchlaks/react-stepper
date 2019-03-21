import { DATA_GET, DATA_GET_FAILURE, DATA_GET_SUCCESS, DATA_POST, DATA_POST_FAILURE, DATA_POST_SUCCESS } from './ActionTypes'
import axios from 'axios';

export function dataPostRequest(allData) {
  return dispatch => {
    dispatch(dataPost());

    return axios.post('/api/kakao/save', {allData})
    .then((response) => {
      console.log('datapost request', response)
      dispatch(dataPostSuccess(response.data));
    }).catch((error) => {
      dispatch(dataPostFailure(error.response.data.code));
    })
  }
}

export function dataPost() {
  return {
    type: DATA_POST
  }
}

export function dataPostSuccess() {
  return {
    type: DATA_POST_SUCCESS
  }
}

export function dataPostFailure() {
  return {
    type: DATA_POST_FAILURE
  }
}

export function dataGetRequest(id) {
  return dispatch => {
    dispatch(dataGet());

    return axios.get(`/api/kakao/view?id=${id}`)
    .then((response) => {
      console.log('data get request', response.data)
      dispatch(dataGetSuccess(response.data))
    }).catch((error) => {
      dispatch(dataGetFailure(response.error.data.code))
    })
  }
}

export function dataGet() {
  return {
    type: DATA_GET
  }
}

export function dataGetSuccess() {
  return {
    type: DATA_GET_SUCCESS
  }
}

export function dataGetFailure() {
  return {
    type: DATA_GET_FAILURE
  }
}