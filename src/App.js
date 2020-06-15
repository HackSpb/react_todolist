import React from 'react';
import {Container } from 'react-bootstrap';
import List from './List.js';

function App() {

  return (
    <>
    <Container className="my-4">

        <List />

    </Container>
    <Container className="my-4">
      <ul>* Описание видов задач:
        <li> <span role="img" aria-label="fly">🦟</span> - мухи. Их надо быстро прихлопывать в начале дня, чтобы не надоедали.</li>
        <li> <span role="img" aria-label="cheese">🌕</span> - большая голова сыра ("слоны"). Ее за раз не проглотить - делите по порциям или "выедайте" наиболее удобные для решения куски.</li>
        <li> <span role="img" aria-label="flower">🌷</span> - цветы. Приятные задачи, которые тоже должны быть в каждом дне и радовать нас. Не забывайте их включать в план для поднятия настроения. </li>
        <li> <span role="img" aria-label="question">⁉</span> - вопросы. С ними не всё понятно - надо принимать решение. Соберитесь с духом и приступайте с нужным настроем.</li>
        <li> <span role="img" aria-label="unicorn"> 🦄</span> - единороги. Заветные, но неконкретные мечты, наровящие затеряться среди буднечных дел. Помните о главном и переводите их разряд "сыров"! </li>

      </ul>
    </Container>
    </>
  );
}

export default App;
