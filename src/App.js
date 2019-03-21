import React, { Component } from 'react';
import './App.css';
import Stepper from 'react-stepper-horizontal';
import { Button, Row, Col, Form, FormGroup, Label, Input, Container, Jumbotron, ListGroup, ListGroupItem  } from 'reactstrap';
import DatePicker from 'react-datepicker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStart: true,
      currentStep : 0,
      date: ''
    }
    this.startClickHandler = this.startClickHandler.bind(this)
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
      case 1:
        this.nextStep()
        return;
      case 2:
        this.nextStep();
        return;
      default:
        return;
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
      case 2: 
        return <Step3 />;
      default: 
        return null;
    }
  }

  startClickHandler() {
    this.setState({
      isStart: false
    })
  }

  render() {
    if (this.state.isStart) {
      return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button onClick={this.startClickHandler} color="primary">Learn More</Button>
          </p>
        </Jumbotron>
      </div>
      )
    }

    return (
      <div>
        <Container>
          <Stepper steps={ [{title: '본인 인증'}, {title: '이용가능한 날짜'}, {title: '스타일'}, {title: '최종확인'}] } activeStep={ this.state.currentStep } />
            
              <Container id='contents' >
                {this.renderSteps()}
              </Container>
            
          <Button id='submitBtn' color="info" onClick={this.nextStepClickHandler}>다음</Button>
        </Container>
      </div>
    );
  }
}

class Step1 extends Component {
  render(){
    return (
      <FormGroup row>
        <Label for="exampleEmail">날짜</Label>
        <Input type="text" name="date" id="date" onChange={this.props.changeDate} placeholder="yyyymmdd 형태로 적으세요" />
        <Label for="exampleEmail">예) 1994년 11월 19일이라면 : 19941119</Label>
      </FormGroup>
    )
  }
}

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state ={
      startDate: new Date(),
      selectedDate: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
      selectedDate: [...this.state.selectedDate, date]
    })
  }

  onDismiss(e) {
    const index = +e.target.name;
    const selectedDate = this.state.selectedDate

    this.setState({
      selectedDate: selectedDate.slice(0, index).concat(selectedDate.slice(index+1))
    })
  }

  render() {
    const selectedDateList = dates => {
      return dates.map((date, index) => {
        const words = date.toString().split(' ').slice(0, 4)
        let sentence = '';

        for (let i =0; i< words.length; i++) {
          sentence += words[i] + ' ';
        }
        return (
          <ListGroupItem  color="warning" key={index}>
            <Row id='data'>
              <Col>
                {sentence}
              </Col>
              <Col>
                <Button name={index} onClick={this.onDismiss}>삭제</Button>
              </Col>
            </Row>
          </ListGroupItem >
        )
      })
    }

    return (
      <div>
        <Row>
          <Col md='4'>
            <Row>
              <Label>날짜를 선택해주세요.</Label>
            </Row>
            <Row>
            <DatePicker
              id='datepicker'
              inline
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            </Row>
           </Col>
           <Col md='8'>
            <Row>
            <Label>추가된 리스트의 삭제 버튼을 누르시면 삭제할 수 있습니다.</Label>
            </Row>
            <Row >
            <ListGroup id='dateListGroup'>
              {selectedDateList(this.state.selectedDate)}
            </ListGroup>
            </Row>
            </Col>
        </Row>
      </div>
    )
  }
}

class Step3 extends Component {
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
export default App;
