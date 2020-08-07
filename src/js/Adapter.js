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
    return `${this.baseURI}${this.currentYear}_${this.currentSemester}.yml`
  }

  get pastSemesterURI() {
    if (this.currentSemester == "spring") {
      return `${this.baseURI}${this.PastYear}_${this.nonCurrentSemester}.yml`
    } else {
      return `${this.baseURI}${this.currentYear}_${this.nonCurrentSemester}.yml`
    }
  }

  get futureSemesterURI() {
    if (this.currentSemester == "fall") {
      return `${this.baseURI}${this.futureYear}_${this.nonCurrentSemester}.yml`
    } else {
      return `${this.baseURI}${this.currentYear}_${this.nonCurrentSemester}.yml`
    }
  }
}
