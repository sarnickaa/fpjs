import initModel from './Model';
import update from './Update';
import view from './View';
import app from './App';

const node = document.getElementById('app');

// runs the app function
app(initModel, update, view, node);
