import React from 'react';
import {Card, CardColumns, Button, Nav, Row,Col, InputGroup, FormControl, Form} from 'react-bootstrap';
//задание компонента через класс
class List extends React.Component {
  constructor(props) {
  		super(props); //вызвать конструктор наследуемого класса, те React.Component

  		this.state = {
        edited: null,
        filter:'all',
  			tasks: [
            {text:"создать первую задачу", kind:'🦟', important: 1, date: new Date().getTime() },
            {text:"создать вторую задачу asd asd asdasd sdasdasdcsdcaxsdcsx qsdsxc qasdcx zdqeadsvcx zcsadqwasc xzq3eadzcvasd   sdasdzxc c", kind:'🌕', important: 0, date: new Date().getTime() }]
  		};

    this.input = React.createRef();
    this.kind = React.createRef();
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
            <div className="float-left" >{item.kind}</div>
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
            onChange={(e)=>this.setTaskField(this.state.edited,'text', e.target.value)}
          />
            <InputGroup.Append>
            <Form.Control as="select" custom onChange={(e)=>this.setTaskField(this.state.edited,'important', (e.target.value=='⭐'?1:0))}>
              <option > ☆ </option>
              <option selected={taskEdited.important && true}>⭐</option>
            </Form.Control>
              <Form.Control as="select" custom  onChange={(e)=>this.setTaskField(this.state.edited,'kind', e.target.value)}>
                <option selected={taskEdited.kind=='🦟' && 'selected'}>🦟</option>
                <option selected={taskEdited.kind=='🌕' && 'selected'}>🌕</option>
                <option selected={taskEdited.kind=='🌷' && 'selected'}>🌷</option>
                <option selected={taskEdited.kind=='⁉' && 'selected'}>⁉</option>
                <option selected={taskEdited.kind=='🦄' && 'selected'} >🦄</option>
              </Form.Control>
              <Button variant="outline-secondary">сохр.</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
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
         <CardColumns className="m-3">
           {list}
        </CardColumns>
      </Row>
      </>
       );
     }

}

export default List;
