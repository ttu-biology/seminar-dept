import { Adapter } from './Adapter.js';
import { Seminar } from './Seminar.js';

const date = new Date();
const adapter = new Adapter(date);
const seminarPage = new Seminar(adapter);

let x = document.getElementById("seminars");
x.innerHTML = `<ul>
                <li>past: ${adapter.pastSemesterURI}</li>
                <li>current: ${adapter.currentSemesterURI}</li>
                <li>future: ${adapter.futureSemesterURI}</li>
               </ul> 
                `;