import React, { Component } from 'react';
import './App.css';
import Stepper from 'react-stepper-horizontal';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep : 0,
      date: ''
    }

    this.nextStepClickHandler = this.nextStepClickHandler.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  nextStepClickHandler() {
    switch(this.state.currentStep) {
      case 0:
        if (this.authentication()) {
          this.nextStep()
        } else {
          alert('틀렸어요 ㅡㅡ')
        }
        return;
      default:
        window.location.reload();
    }
  }

  nextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1
    })
  }

  authentication() {
    return (this.state.date === '20131018')
  }

  changeDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  renderSteps() {
    switch(this.state.currentStep) {
      case 0:
        return <Step1 changeDate={this.changeDate} />;
      case 1:
        return <Step2 />;
      default: 
        return null;
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Stepper steps={ [{title: '본인 인증'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ this.state.currentStep } />
            <div id='contents'>
              {this.renderSteps()}
            </div>
          <Button id='submitBtn' color="info" onClick={this.nextStepClickHandler}>다음</Button>
        </Container>
      </div>
    );
  }
}

class Step1 extends Component {
  render(){
    return (
    <Form>
      <FormGroup row>
        <Label for="exampleEmail">날짜</Label>
        <Input type="text" name="date" id="date" onChange={this.props.changeDate} placeholder="yyyymmdd 형태로 적으세요" />
        <Label for="exampleEmail">예) 1994년 11월 19일이라면 : 19941119</Label>
      </FormGroup>
    </Form>
    )
  }
}

class Step2 extends Component {
  render() {
    return (
      <Form>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option one is this and that—be sure to include why it's great
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option two can be something else and selecting it will deselect option one
          </Label>
        </FormGroup>
      </Form>
    )
  }
}

class Step3 extends Component {
  render() {
    return (
      <div>step3</div>
    )
  }
}
export default App;
