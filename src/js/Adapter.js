export class Adapter {
  constructor(date, baseURI="https://raw.githubusercontent.com/ttu-biology/seminar-dept/master/seminars/"){
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
    this.pastYear = this.currentYear - 1;
    this.futureYear = this.currentYear + 1;
    this.baseURI = baseURI;
  }

  get currentSemester() {
    return (this.currentMonth <= 4) ? "spring" : "fall"
  }

  get nonCurrentSemester() {
    return (this.currentSemester === "spring") ? "fall" : "spring"
  }

  get currentSemesterURI() {
    return `${this.baseURI}${this.currentYear}_${this.currentSemester}.json`
  }

  get pastSemesterURI() {
    if (this.currentSemester == "spring") {
      return `${this.baseURI}${this.PastYear}_${this.nonCurrentSemester}.json`
    } else {
      return `${this.baseURI}${this.currentYear}_${this.nonCurrentSemester}.json`
    }
  }

  get futureSemesterURI() {
    if (this.currentSemester == "fall") {
      return `${this.baseURI}${this.futureYear}_${this.nonCurrentSemester}.json`
    } else {
      return `${this.baseURI}${this.currentYear}_${this.nonCurrentSemester}.json`
    }
  }

  get(seminarURI) {
    return fetch(seminarURI)
           .then(response => response.json())
  }
}
