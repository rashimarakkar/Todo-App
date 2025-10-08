
import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface ITask {
  id: number;
  name: string;
  status: string;
  date: Date
}

@Component({
  selector: 'app-todo-app',
  imports: [FormsModule, DatePipe],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css'
})
export class TodoApp implements OnInit{

todoList= signal<ITask[]>([]);  
filteredTodoList= signal<ITask[]>([]);
isFilterRecordPresent = signal<boolean>(true)  

todoItem={
  name:''
}  

ngOnInit(): void {
  const localData = localStorage.getItem("taskList");
  if(localData!== null){
    const parsedData = JSON.parse(localData);
    this.todoList.set(parsedData);
    this.filteredTodoList.set(parsedData)
  }
}


submitForm(form:any){
if (!form.valid) return;
const newTask : ITask={
  id: this.todoList().length + 1,
  name: this.todoItem.name,
  status: 'pending',
  date: new Date()
}
this.todoList.update((old)=> [...old,newTask ]);
 this.todoItem.name = '';
  form.resetForm(); // resets form state, including touched/dirty
  localStorage.setItem("taskList",JSON.stringify(this.todoList()));
  this.filteredTodoList.set(this.todoList());
}

onTextChange(){

const filterData = this.todoList().filter(m=> m.name.toLowerCase().startsWith(this.todoItem.name.toLowerCase()));
if(filterData.length !=0){
  this.isFilterRecordPresent.set(true);
  this.filteredTodoList.set(filterData)
}else{
  this.isFilterRecordPresent.set(false);
}
}
deleteTask(id: number){

 const filterData = this.todoList().filter(t  =>  t.id.toString() !== id.toString());
  this.filteredTodoList.set(filterData);
  this.todoList.set(filterData);
 localStorage.setItem('taskList', JSON.stringify(filterData))
}
onFilterChange(event: any){

  const status = event.target.value;
  const filterData = this.todoList().filter(m=> m.status.startsWith(status));
if(status === 'all'){
  this.isFilterRecordPresent.set(true);
  const localData = this.todoList()
  this.filteredTodoList.set(localData)
}else{
 if(filterData.length !==0){
  this.isFilterRecordPresent.set(true);
  this.filteredTodoList.set(filterData)
}else{
  this.isFilterRecordPresent.set(false);
}
}


}

statusChange(event:any, item: ITask){

const status = event.target.value;
item.status=status;
this.todoList.set(this.filteredTodoList());
localStorage.setItem('taskList', JSON.stringify(this.todoList()))


}
}
