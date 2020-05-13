var token = "13679~oCA3xVNzmeE11RfWJPpH5vbS2M4R9FJNEa4xQtuirxyDUYMVFbgoBfdp6Eq3d3wk" //<--- copy your token here

//url that gives list of courses
const url = "https://canvas.chapman.edu/api/v1/courses";

//request
fetch(url, {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token
  }
})

  //response to json
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {

    //for each element in list of courses
    for(item in data){
      var id = data[item]['id'];

      //url that gives list of upcoming assignments
      var url = ("https://canvas.chapman.edu/api/v1/courses/" + id + "/assignments?bucket=upcoming")

      //request
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })

        //response to json
        .then(function(response){
          response.json().then(function(assignments) {

            //for each assignment
            for(i in assignments){

              //creates listing that shows on chrome extension
              var due = new Date(assignments[i]['due_at'])
              const body = document.querySelector('body');
              const div = document.createElement('div')
              const p = document.createElement('p');
              div.setAttribute('class', 'modal-content');
              body.append(div);
              div.append(p);
              p.innerHTML = ("DUE: " + due.toLocaleString() + " " + assignments[i]['name']).link(assignments[i]['html_url']);
            }
          })
        })
      }
  });
