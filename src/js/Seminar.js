export class Seminar {
  constructor(adapter, baseImageURI){
    this.adapter = adapter;
    this.baseImageURI = baseImageURI;
  }

  get load() {
    window.addEventListener('DOMContentLoaded', (e) => {
      const seminarURI = this.adapter.pastSemesterURI;
      this.getSeminars(seminarURI);
    });
  }

  removeElements(classOrId){
    document.querySelectorAll(classOrId).forEach(e => e.parentNode.removeChild(e));
  }

  displaySeminars(json) {
    this.removeElements("#seminars div");
    const seminars = document.getElementById("seminars");
    for (const seminar of json.seminars) {
      let seminarCard = this.seminarCard(seminar);
      seminars.appendChild(seminarCard);
    }
  }

  seminarCard(seminar) {
    let seminarDiv = document.createElement('div');
    seminarDiv.innerHTML = (seminar.is_holiday) ? this.holidaySeminar(seminar) : this.nonHolidaySeminar(seminar);
    return seminarDiv;
  }

  nonHolidaySeminar(seminar) {
    return `
      <section class="${(seminar.is_cancelled) ? "seminar cancelled" : "seminar" }">
        <div class="date_img">
          <h3 class="date">${seminar.date}</h3>
          ${this.seminarImageCard(seminar)}
        </div>
        <div class="title_speaker">
          <div class="title">Title: ${seminar.title}</div>
          ${this.seminarSpeaker(seminar)}
          ${this.seminarHost(seminar)}
        </div>
      </section>
    `
  }

  holidaySeminar(seminar) {
    return `
    <section class="seminar">
      <div class="date_img">
        <h3 class="date">${seminar.date}</h3>
        <div class="advert_placeholder"></div>
      </div>
      <div class="title_speaker holiday">
        <div>Holiday: ${seminar.holiday_name}</div>
      </div>
    </section>
    `
  }

  seminarImageCard(seminar) {
    if(seminar.seminar_image) {
      const imageLink = `${this.baseImageURI}/${seminar.seminar_image}`;
      return `
        <img class="advert" src="${imageLink}">
        <div class="modal"><span class="close">×</span><img class="modal_content" src="${imageLink}"></div>
      `
    } else {
      return '<div class="advert_placeholder"></div>'
    }
  }

  seminarSpeaker(seminar) {
    if(seminar.speaker_website) {
      return `
        <div class="speaker">Speaker: <a class="speaker_website" href="${seminar.speaker_website}" title="${seminar.speaker} - ${seminar.speaker_affiliation}" target="_blank">${seminar.speaker}</a></div>
      `
    } else {
      return `<div class="speaker">Speaker: ${seminar.speaker}</div>`
    }
  }

  seminarHost(seminar) {
    if(seminar.host_website) {
      return `
        <div class="host">Host: <a class="host_website" href="${seminar.host_website}" title="${seminar.host} - ${seminar.host_affiliation}" target="_blank">${seminar.host}</a></div>
      `
    } else {
      return `<div class="host">Host: ${seminar.host}</div>`
    }
  }
  
  getSeminars(seminarURI) {
    this.adapter.get(seminarURI)
        .then(json => this.displaySeminars(json));
  }
}
