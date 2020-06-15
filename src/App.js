import React from 'react';
import {Container,Row, Col, InputGroup, FormControl,Button, Form} from 'react-bootstrap';
import List from './List.js';

function App() {
  return (
    <>
    <Container className="my-4">
      <Row>
        <Col>
        <InputGroup className="my-3">
          <FormControl placeholder="текст новой задачи" />
            <InputGroup.Append>
            <Form.Control as="select" custom>
              <option> ☆ </option>
              <option> ⭐ </option>
            </Form.Control>
              <Form.Control as="select" custom>
                <option>🦟 </option>
                <option>🌕 </option>
                <option>🌷</option>
                <option>⁉</option>
                <option>🦄</option>
              </Form.Control>
              <Button variant="outline-secondary">сохр</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <List />
      </Row>
    </Container>
    <Container className="my-4">
      <ul>* Описание видов задач:
        <li> 🦟 - мухи. Их надо быстро прихлопывать в начале дня, чтобы не надоедали.</li>
        <li> 🌕 - большая голова сыра ("слоны"). Ее за раз не проглотить - делите по порциям или "выедайте" наиболее удобные для решения куски.</li>
        <li> 🌷 - цветы. Приятные задачи, которые тоже должны быть в каждом дне и радовать нас. Не забывайте их включать в план для поднятия настроения. </li>
        <li> ⁉ - вопросы. С ними не всё понятно - надо принимать решение. Соберитесь с духом и приступайте с нужным настроем.</li>
        <li> 🦄 - единороги. Заветные, но неконкретные мечты, наровящие затеряться среди буднечных дел. Помните о главном и переводите их разряд "сыров"! </li>

      </ul>
    </Container>
    </>
  );
}

export default App;
