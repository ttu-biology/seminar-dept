'use strict';

//script.js

(function () {
  var peopleJsonUrl = "https://raw.githubusercontent.com/WilliamBarela/MemberList/master/assets/json/people.json";

  fetch(peopleJsonUrl).then(function (response) {
    return response.json();
  }).then(function (response) {
    updateUISuccess(response);
  }).catch(function () {
    updateUIFailure();
  });

  function updateUISuccess(response) {
    var people = document.querySelector('#people');
    var config = response.config;
    var staff = response.staff;

    for (var i = 0; i < staff.length; i++) {
      var person = staff[i];
      var row = document.createElement('div');
      var img_div = document.createElement('div');
      var info_div = document.createElement('div');

      genPersonRow(person, row, img_div, info_div);
    };

    function genImgDiv(person, img_div) {
      var link = document.createElement('a');
      var img = document.createElement('img');

      img_div.setAttribute('class', config.img_class);

      link.setAttribute('href', config.href_prepend + person.href_postpend);

      img.setAttribute('alt', person.alt);
      img.setAttribute('src', config.src_prepend + person.image);

      link.appendChild(img);
      img_div.appendChild(link);
    };

    function genInfoDiv(person, info_div) {
      var name = document.createElement('h2');
      var link = document.createElement('a');
      var title = document.createElement('h4');
      var email = document.createElement('p');
      var email_link = document.createElement('a');
      var phone = document.createElement('p');
      var office = document.createElement('p');

      var children = [name, title, email, phone, office];

      info_div.setAttribute('class', config.info_class);

      link.setAttribute('href', config.href_prepend + person.href_postpend);
      link.textContent = person.name;
      name.appendChild(link);

      title.setAttribute('class', 'italic');
      title.textContent = person.title;

      email_link.setAttribute('href', "mailto:" + person.email);
      email_link.textContent = person.email;

      email.textContent = "Contact: ";
      email.appendChild(email_link);

      phone.textContent = "Phone: " + person.phone;

      office.textContent = "Office: " + person.office;

      for (var _i = 0; _i < children.length; _i++) {
        info_div.appendChild(children[_i]);
      }
    };

    function joinAttachRow(row, img_div, info_div) {
      row.setAttribute('class', 'row');
      row.appendChild(img_div);
      row.appendChild(info_div);
      people.appendChild(row);
    };

    function genPersonRow(person, row, img_div, info_div) {
      genImgDiv(person, img_div);
      genInfoDiv(person, info_div);
      joinAttachRow(row, img_div, info_div);
    };
  };

  function updateUIFailure() {
    console.log("Request failed.");
  };
})();
