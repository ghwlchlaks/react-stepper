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

      }
    })
  }

  render() {
    return (
      <div>
        view 입니다.
        {this.props.match.params.id}
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