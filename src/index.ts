import Calendar from './calendar';
import Renderer from './renderer';

const calendar = new Calendar();
console.log(JSON.stringify(calendar.getWeeks()));

const renderer = new Renderer();
renderer.render();
