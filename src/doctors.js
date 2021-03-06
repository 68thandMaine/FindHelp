class Doctors {

constructor(firstName, lastName, id) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.id = id;
}

  getDoctors(issue, name) {
    const Promse = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url =
      `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&name=${name}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(`<div class="card">
          <div class="card-body" id="userInputError">
          <h5 class="card-title">Uh Oh!</h5>
          <h6 class="card-subtitle mb-2 text-muted">We don't quite understand what you're searching for.</h6>
          <p class="card-text">Please make sure all form fields have an option selected and try again!</p>
          <p class="card-text">The error you encountered was due to a ${request.statusText}</p>
          <button type="button" class="btn btn-secondary" id="backToSearch">Back to Search</button>
          </div>
          </div>`));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  buildSearchInput(response) {
    const listOfDoctorNames = [];
    const parsedResponse = JSON.parse(response);
    console.log(parsedResponse);
    parsedResponse.data.forEach((doctors) => {
      if (doctors.profile !== undefined) {
        let doctor = new Doctors (doctors.profile.first_name, doctors.profile.last_name, doctors.npi)
        listOfDoctorNames.push(doctor);
      }
    });
    return listOfDoctorNames
  }


}
export { Doctors };
