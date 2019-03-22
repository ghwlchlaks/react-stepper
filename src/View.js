import React, { Component } from 'react'
import { dataGetRequest } from './actions/message';
import {connect} from 'react-redux'

class View extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dataGetRequest(id)
    .then(() => {
      if (this.props.getData.status === 'SUCCESS') {
        console.log(this.props.getData)
      }
    })
  }

  render() {
    return (
      <div>
        view 입니다.
        {this.props.getData.status === 'SUCCESS' ? <div>
        제출 시간 : {this.props.getData.data.createdDate}
        step 1 : {this.props.getData.data.message.step1}
        step 2 : {this.props.getData.data.message.step2}
        step 3 : {this.props.getData.data.message.step3}
        step 4 : {this.props.getData.data.message.step4}
        </div>
         : <div>
           로딩중
           </div>
        } 
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dataGetRequest: (id) => {
      return dispatch(dataGetRequest(id))
    }
  }
}
const mapStateToProps = state => { 
  return {
    getData: state.message.get
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);