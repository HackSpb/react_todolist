import React from 'react';
//подключение стилевых компонентов от бутстрапа
import {Button,Row,Col, InputGroup, Form} from 'react-bootstrap';

//задание компонента через класс
class Taskform extends React.Component {
// компонент формы
    render(){
      let eid= this.props.stateParent.edited;
      let taskEdited=(eid!==null)?this.props.stateParent.tasks[eid] : {text:'',important:'',kind:''};
// taskEdited - массив с редактируемой задачей
        return (
          <Row>


            <Col  md="8" className="py-3">
              <Form.Control placeholder='текст новой задачи'
                value={taskEdited.text? taskEdited.text: null}
                ref={this.props.links.input}
                onChange={(e)=>{this.props.stateParent.edited!==null && this.props.setTaskField(this.props.stateParent.edited,'text', e.target.value)} }
              />
              </Col>
              <Col  md="4" className="py-3">
              <InputGroup>
                <InputGroup.Append>
                <Form.Control as="select" custom
                  ref={this.props.links.important}
                  onChange={(e)=>(this.props.stateParent.edited!==null && this.props.setTaskField(this.props.stateParent.edited,'important', (e.target.value==='⭐'?1:0)))}
                  >
                  <option >☆</option>
                  <option selected={taskEdited.important && true}>⭐</option>
                </Form.Control>
                  <Form.Control as="select" custom
                    ref={this.props.links.kind}
                    onChange={(e)=>(this.props.stateParent.edited!==null && this.props.setTaskField(this.props.stateParent.edited,'kind', e.target.value))}
                  >
                    <option selected={taskEdited.kind==='🦟' && 'selected'}>🦟</option>
                    <option selected={taskEdited.kind==='🌕' && 'selected'}>🌕</option>
                    <option selected={taskEdited.kind==='🌷' && 'selected'}>🌷</option>
                    <option selected={taskEdited.kind==='⁉' && 'selected'}>⁉</option>
                    <option selected={taskEdited.kind==='🦄' && 'selected'} >🦄</option>
                  </Form.Control>
                  <Button  onClick={()=>this.props.saveTask()}>сохр.</Button>
                </InputGroup.Append>
                </InputGroup>
                </Col>


          </Row>
        );
    }


}

export default Taskform;
