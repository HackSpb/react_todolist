import React from 'react';
import {Container } from 'react-bootstrap';
import Taskform from './Taskform.js';
import List from './List.js';

class App extends React.Component {
  constructor(props) {
  		super(props); //вызвать конструктор наследуемого класса, т.е. React.Component

      //тут мы берем из local storage сохраненые задачи или создаем новый массив
      let tasks =  localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')) :   [{text:"создать первую задачу", kind:'🦟', important: 1}];
      //let tasks =[{text:"создать первую задачу", kind:'🦟', important: 0},{text:"создать первую задачу", kind:'🦟', important: 1}]
      this.state = {
        edited: null,
        filter:'all',
  			tasks: tasks
        };
        //мы создаем ref ссылки для доступа к содержимому конкретных html элементов https://ru.reactjs.org/docs/forwarding-refs.html
      this.links={input : React.createRef(),important : React.createRef(), kind : React.createRef()};
  	}

    saveTask(){
      //сохранение новой задачи
      if(this.state.edited!==null){
        this.setState({edited:null});
        // при редактирвоании существующей задачи ничего не длаем так как задача была уже отредактирована реалтайм
      }else{
      if(this.links.input.current.value==='') return false;
      //доступ к содержимомму с использованием рефов
        let new_task ={
          'text':  this.links.input.current.value,
          'important': this.links.important.current.value,
          'kind': this.links.kind.current.value,
        }
        console.log(new_task);
        let tasks = this.state.tasks.slice();
        tasks.unshift(new_task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});
      }
      this.links.input.current.value="";
      this.links.important.current.value="☆";
      this.links.kind.current.value="🦟";
    }


    changeState(key, value){
      // изменение полей filter или edited у нашего state
        if(key === 'filter'){
          let filter = value;
          this.setState({filter});
        }else if(key === 'edited'){
          let edited = value;
          this.setState({edited});
        }

      }

      setTaskField(id,field,value){
        //задание свойства у конкрентной задачи
        let tasks = this.state.tasks.slice();
        if(field === 'delete'){
          tasks.splice(id,1);
        }else{
          tasks[id][field] = value;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});

    }

    setEditedTask(id){
      //установка редактируемой задачи
      this.setState({edited:id})
    }

  render(){
/* здесть внутри JSX мы добавляем 2 бутстраповских контейнера Container.
Но при этом JSX код должен быть всегда обвернут в один компонент
Мы подключаем 2 самописных компонента Taskform и List
*/
    return (
    <>
    <Container className="my-4">
        <Taskform stateParent={this.state} saveTask={(saveTask)=>this.saveTask(saveTask)} setTaskField={(id,field,value)=>this.setTaskField(id,field,value)} links={this.links}/>
        <List stateParent={this.state} setTaskField={(id,field,value)=>this.setTaskField(id,field,value)}  setEditedTask={(id)=>this.setEditedTask(id)} changeState={(key, value)=>this.changeState(key, value)} links={this.links} />

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
}

export default App;
