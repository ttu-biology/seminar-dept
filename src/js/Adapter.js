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

  get pastSemesterYear(){
    if (this.currentSemester == "spring") {
      return this.pastYear
    } else {
      return this.currentYear
    }
  }

  get futureSemesterYear(){
    if (this.currentSemester == "fall") {
      return this.futureYear
    } else {
      return this.currentYear
    }
  }

  get currentSemesterURI() {
    return `${this.baseURI}${this.currentYear}_${this.currentSemester}.json`
  }


  get pastSemesterURI() {
    return `${this.baseURI}${this.pastSemesterYear}_${this.nonCurrentSemester}.json`
  }

  get futureSemesterURI() {
    return `${this.baseURI}${this.futureSemesterYear}_${this.nonCurrentSemester}.json`
  }

  get pastSeminarName() {
    return this.navName(this.nonCurrentSemester, this.pastSemesterYear)
  }

  get currentSeminarName() {
    return this.navName(this.currentSemester, this.currentYear)
  }

  get futureSeminarName() {
    return this.navName(this.nonCurrentSemester, this.futureSemesterYear)
  }
  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
  }

  navName(semester, year) {
    return `${this.capitalize(semester)} ${year}`
  }

  get(seminarURI) {
    return fetch(seminarURI)
           .then(response => response.json())
  }
}
