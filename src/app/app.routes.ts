import { Routes } from '@angular/router';
import { TodoApp } from './components/todo-app/todo-app';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'todo-app',
        pathMatch:'full'
    },
    {
        path:'todo-app',
        component: TodoApp
    }
];
