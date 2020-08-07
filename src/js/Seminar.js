export class Seminar {
  constructor(adapter){
    this.adapter = adapter
  }

  get load() {
    window.addEventListener('DOMContentLoaded', (e) => {
      const seminarURI = this.adapter.pastSemesterURI;
      this.getSeminars(seminarURI);
    });
  }

  displaySeminars(json) {
    const seminars = document.getElementById("seminars");
    for (const seminar of json.seminars) {
      let seminarCard = this.seminarCard(seminar);
      seminars.appendChild(seminarCard);
    }
  }

  seminarCard(seminar) {
    let seminarDiv = document.createElement('div');
    seminarDiv.innerHTML = `<h1>${seminar.date}</h1>`
    return seminarDiv;
  }
  
  getSeminars(seminarURI) {
    this.adapter.get(seminarURI)
        .then(json => this.displaySeminars(json));
  }
}
