import React from 'react';
import {Card, CardColumns, Button, Nav, Row,Col, InputGroup, Form} from 'react-bootstrap';
//задание компонента через класс
class List extends React.Component {
  constructor(props) {
  		super(props); //вызвать конструктор наследуемого класса, те React.Component
      console.log( localStorage.getItem('tasks'));
      let tasks =  localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')) :   [{text:"создать первую задачу", kind:'🦟', important: 1}];
  console.log( tasks);
      this.state = {
        edited: null,
        filter:'all',
  			tasks: tasks
        };
  console.log( this.state);
      this.input = React.createRef();
      this.important = React.createRef();
      this.kind = React.createRef();
  	}

  saveTask(){
    if(this.state.edited){
      this.setState({edited:null});
    }
    else{
      if(this.input.current.value==='') return false;
      let new_task ={
        'text':  this.input.current.value,
        'important': this.important.current.value,
        'kind': this.kind.current.value,
      }
       this.input.current.value="";
       this.important.current.value="";
       this.kind.current.value="";
      console.log(new_task);
      let tasks = this.state.tasks.slice();
      tasks.push(new_task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.setState({tasks});
    }
  }

  changeState(key, value){
      if(key === 'filter'){
        let filter = value;
        this.setState({filter});
      }else if(key === 'edited'){
        let edited = value;
        this.setState({edited});
      }

    }

  setTaskField(id,field,value){
    //if(!id) id= this.state.edited
    console.log(id);
    console.log(field);
    let tasks = this.state.tasks.slice();
    if(field === 'delete'){
      tasks.splice(id,1);
    }else{
      tasks[id][field] = value;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({tasks});

  }


  render(){

      let list = this.state.tasks.map((item,index) => {
        if(this.state.filter === 'important' && !item.important) {return false;}
        else if(this.state.filter === 'plans' && item.finished) {return false;}
        else if(this.state.filter === 'finished' && !item.finished) {return false;}
        return (
        <Card key={index} border={item.important && 'danger'} text={item.finished && 'success'} bg={item.finished && 'light'}>
          <Card.Header className="py-1">
            <div className="float-left emoji" >{item.kind}</div>
            <div className="importantBlock float-right emoji" onClick={()=>this.setTaskField(index,'important', !item.important)}>{item.important  ? '⭐'  : '☆' }</div>
            <div className="importantBlock float-right emoji" onClick={()=>this.setState({edited:index})}> ✏ </div>


          </Card.Header>
          <Card.Body>
            <Card.Text>{item.text}</Card.Text>
            <Button size="sm" variant="danger" className="float-left emoji" onClick={()=>this.setTaskField(index,'delete', true)}><span role="img" aria-label="ok">🗑</span></Button>

            <Button size="sm" variant="success" className="float-right emoji" onClick={()=>this.setTaskField(index,'finished', !item.finished)}><span role="img" aria-label="ok">👌</span></Button>
          </Card.Body>
        </Card>
      )});

    let taskEdited=(this.state.edited!==null)?this.state.tasks[this.state.edited] : {important:'',kind:''};


    return (

      <>
      <Row>
        <Col>
        <InputGroup className="my-3">

          <Form.Control placeholder='текст новой задачи'
            value={taskEdited.text? taskEdited.text: null}
            ref={this.input}
            onChange={(e)=>(this.state.edited && this.setTaskField(this.state.edited,'text', e.target.value))}
          />
            <InputGroup.Append>
            <Form.Control as="select" custom
              ref={this.important}
              onChange={(e)=>(this.state.edited && this.setTaskField(this.state.edited,'important', (e.target.value=='⭐'?1:0)))}
              >
              <option > ☆ </option>
              <option selected={taskEdited.important && true}>⭐</option>
            </Form.Control>
              <Form.Control as="select" custom
                ref={this.kind}
                onChange={(e)=>(this.state.edited && this.setTaskField(this.state.edited,'kind', e.target.value))}
              >
                <option selected={taskEdited.kind=='🦟' && 'selected'}>🦟</option>
                <option selected={taskEdited.kind=='🌕' && 'selected'}>🌕</option>
                <option selected={taskEdited.kind=='🌷' && 'selected'}>🌷</option>
                <option selected={taskEdited.kind=='⁉' && 'selected'}>⁉</option>
                <option selected={taskEdited.kind=='🦄' && 'selected'} >🦄</option>
              </Form.Control>
              <Button variant="outline-secondary" onClick={()=>this.saveTask()}>сохр.</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
         <Nav variant="tabs" defaultActiveKey="#all">
          <Nav.Item>
            <Nav.Link href="#all" onClick={()=>this.changeState('filter','all')}> Все </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#important" onClick={()=>this.changeState('filter','important')}> Важные </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#plans" onClick={()=>this.changeState('filter','plans')}> Планируемые</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#finished" onClick={()=>this.changeState('filter','finished')}> Сделанные </Nav.Link>
          </Nav.Item>
        </Nav>
        </Col>
      </Row>
      <Row>
         <CardColumns className="m-3">
           {list}
        </CardColumns>
      </Row>
      </>
       );
     }

}

export default List;
