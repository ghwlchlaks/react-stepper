import React, { Component } from 'react';
import './App.css';
import Stepper from 'react-stepper-horizontal';
import { Button, Row, Col, Form, FormGroup, Label, Input, Container, Jumbotron, ListGroup, ListGroupItem, Card, CardText, CardTitle } from 'reactstrap';
import DatePicker from 'react-datepicker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmRadio: 'option2',
      isStart: true,
      currentStep : 0,

      // step 2
      date: '',
      selectedDate: []
    }
    this.startClickHandler = this.startClickHandler.bind(this)
    this.mainRadioChangeHandler = this.mainRadioChangeHandler.bind(this);
    this.nextStepClickHandler = this.nextStepClickHandler.bind(this);
    
    //step1
    this.changeDate = this.changeDate.bind(this);

    // step2
    this.handleChange = this.handleChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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
        if (this.dateListCheck()) {
          this.nextStep()
        } else {
          alert('한 개 이상 선택하셔야합니다.')
        }
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

  // step 2
  dateListCheck() {
    return (this.state.selectedDate.length > 0)
  }
  
  handleChange(date) {
    const slice_date = date.toString().split(' ').slice(0, 4);
    let sentence = '';

    for (let i=0; i< slice_date.length; i++) {
      sentence += slice_date[i] + ' ';
    }

    if (this.state.selectedDate.indexOf(sentence) === -1) {
      this.setState({
        startDate: date,
        selectedDate: [...this.state.selectedDate, sentence]
      })
    } else {
      return;
    }
  }

  onDismiss(e) {
    const index = +e.target.name;
    const selectedDate = this.state.selectedDate

    this.setState({
      selectedDate: selectedDate.slice(0, index).concat(selectedDate.slice(index+1))
    })
  }

  renderSteps() {
    switch(this.state.currentStep) {
      case 0:
        return <Step1 changeDate={this.changeDate} />;
      case 1:
        return <Step2 handleChange={this.handleChange} onDismiss={this.onDismiss} selectedDate={this.state.selectedDate} />;
      case 2: 
        return <Step3 />;
      case 3:
        return <Step4 selectedDate={this.state.selectedDate}/>;
      default: 
        return null;
    }
  }

  startClickHandler() {
    if (this.state.confirmRadio === 'option1') {
      this.setState({
        isStart: false
      })
    }
  }

  mainRadioChangeHandler(e) {
    this.setState({
      confirmRadio: e.target.value
    })
  }

  componentDidMount() {
    
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
         
          <Form>
            <FormGroup check>
              <Label check>
                <Input type="radio" checked={this.state.confirmRadio === 'option1'} name="confirmRadio" value='option1' onChange={this.mainRadioChangeHandler} />{' '}
                승낙
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" checked={this.state.confirmRadio === 'option2'} name="confirmRadio" value='option2' onChange={this.mainRadioChangeHandler} />{' '}
                거절 
              </Label>
            </FormGroup>
          </Form>

            <Button onClick={this.startClickHandler} color="primary">Learn More</Button>
        </Jumbotron>

        <a id="kakao-link-btn" href="javascript:;">
          <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
        </a>
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
    }
  }

  render() {
    const selectedDateList = dates => {
      return dates.map((date, index) => {
        return (
          <ListGroupItem  color="warning" key={index}>
            <Row id='data'>
              <Col>
                {date}
              </Col>
              <Col>
                <Button name={index} onClick={this.props.onDismiss}>삭제</Button>
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
              onChange={this.props.handleChange}
            />
            </Row>
           </Col>
           <Col md='8'>
            <Row>
            <Label>추가된 리스트의 삭제 버튼을 누르시면 삭제할 수 있습니다.</Label>
            </Row>
            <Row >
            <ListGroup id='dateListGroup'>
              {selectedDateList(this.props.selectedDate)}
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

class Step4 extends Component {
  render() {
    return (
      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardTitle>내용을 확인하시고 제출을 클릭하세요!</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button>제출</Button>
      </Card>
    )
  }
}
export default App;
