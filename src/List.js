import React from 'react';
import {Card, CardColumns, Button, Nav, Row,Col} from 'react-bootstrap';





//задание компонента через класс
class List extends React.Component {



  render(){

//создаем список блоков из массива задач с предварительной фильтрацией согласно текущему фильтру
      let list = this.props.stateParent.tasks.map((item,index) => {
        if(this.props.stateParent.filter === 'important' && !item.important) {return false;}
        else if(this.props.stateParent.filter === 'plans' && item.finished) {return false;}
        else if(this.props.stateParent.filter === 'finished' && !item.finished) {return false;}
        return (
        <Card key={index} border={item.important && 'danger'} text={item.finished && 'success'} bg={item.finished && 'light'}>
          <Card.Header className="py-1">
            <div className="float-left emoji" >{item.kind}</div>
            <div className="importantBlock float-right emoji" onClick={()=>this.props.setTaskField(index,'important', !item.important)}>{item.important  ? '⭐'  : '☆' }</div>
            <div className="importantBlock float-right emoji" onClick={()=>this.props.setEditedTask(index)}> ✏ </div>


          </Card.Header>
          <Card.Body >
            <Card.Text>{item.text}</Card.Text>
            <Button size="sm" variant="danger" className="float-left emoji mb-1" onClick={()=>this.props.setTaskField(index,'delete', true)}><span role="img" aria-label="ok">🗑</span></Button>

            <Button size="sm" variant="success" className="float-right emoji mb-1" onClick={()=>this.props.setTaskField(index,'finished', !item.finished)}><span role="img" aria-label="ok">👌</span></Button>
          </Card.Body>
        </Card>
      )});


// выводим фильтр и список задач
    return (

      <>

      <Row>
        <Col>
         <Nav variant="tabs" defaultActiveKey="#all">
          <Nav.Item>
            <Nav.Link href="#all" onClick={()=>this.props.changeState('filter','all')}> Все </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#important" onClick={()=>this.props.changeState('filter','important')}> Важные </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#plans" onClick={()=>this.props.changeState('filter','plans')}> Планируемые</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#finished" onClick={()=>this.props.changeState('filter','finished')}> Сделанные </Nav.Link>
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
