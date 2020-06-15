import React from 'react';
import {Card, CardColumns, Button, Nav} from 'react-bootstrap';
//задание компонента через класс
class List extends React.Component {
  constructor(props) {
  		super(props); //вызвать конструктор наследуемого класса, те React.Component

  		this.state = {
        filter:'all',
  			tasks: [
            {text:"создать первую задачу", kind:'🦟', important: 1, date: new Date().getTime() },
            {text:"создать вторую задачу asd asd asdasd sdasdasdcsdcaxsdcsx qsdsxc qasdcx zdqeadsvcx zcsadqwasc xzq3eadzcvasd   sdasdzxc c", kind:'🧱', important: 0, date: new Date().getTime() }]
  		};
  	}
  handleClick(e,id,field,value){
     e.persist()//заякорим событие, чтобы оно не обнулялось
    console.log(field);
    console.log(value);
    let tasks = this.state.tasks.slice();
    if(field === 'delete'){
      tasks.splice(id,1);
    }else{
      tasks[id][field] = value;
    }
    console.log({tasks});
    this.setState({tasks});
  }

  render(){

      let list = this.state.tasks.map((item,index) => {return (
        <Card key={index} border={item.important && 'danger'} text={item.finished && 'success'} bg={item.finished && 'light'}>
          <Card.Header className="py-1">
            <div className="float-left" >{item.kind}</div>
            <div className="importantBlock float-right" onClick={(e)=>this.handleClick(e,index,'important', !item.important)}>{item.important  ? '⭐'  : '☆' }</div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{item.text}</Card.Text>
            <Button size="sm" variant="danger" className="float-left" onClick={(e)=>this.handleClick(e,index,'delete', true)}><span role="img" aria-label="ok">🗑</span></Button>

            <Button size="sm" variant="success" className="float-right" onClick={(e)=>this.handleClick(e,index,'finished', !item.finished)}><span role="img" aria-label="ok">👌</span></Button>
          </Card.Body>
        </Card>
      )});


    return (
         <div>
         <Nav variant="tabs" defaultActiveKey="#all">
          <Nav.Item>
            <Nav.Link href="#all"> Все </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1"> Важные </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2"> Планируемые</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3"> Сделанные </Nav.Link>
          </Nav.Item>
        </Nav>
         <CardColumns className="m-3">
           {list}
        </CardColumns>
         </div>
       );
     }

}

export default List;
