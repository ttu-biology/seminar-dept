import { Adapter } from './Adapter.js';
import { Seminar } from './Seminar.js';

const date = new Date();
const baseURI = "https://raw.githubusercontent.com/ttu-biology/seminar-dept/master/seminars/";
const baseImageURI = "https://raw.githubusercontent.com/ttu-biology/seminar-dept/master/img/";

const adapter = new Adapter(date, baseURI);
const seminarPage = new Seminar(adapter, baseImageURI);

seminarPage.load;
