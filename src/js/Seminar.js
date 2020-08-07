export class Seminar {
  constructor(adapter){
    this.adapter = adapter
  }

  get seminars() {
    const seminarURI = this.adapter.pastSemesterURI;
    this.adapter.get(seminarURI)
        .then(json => console.log(json));
  }
}
