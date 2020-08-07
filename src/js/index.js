import { Adapter } from './Adapter.js';
import { Seminar } from './Seminar.js';

const date = new Date();
const adapter = new Adapter(date);
const seminarPage = new Seminar(adapter);
