/*
// Make the call to the API, setting the token
// in the Authorization header
const response = fetch("/api/external", {
  headers: {
    Authorization: `Bearer ${'13679~oCA3xVNzmeE11RfWJPpH5vbS2M4R9FJNEa4xQtuirxyDUYMVFbgoBfdp6Eq3d3wk'}`
  }
});

// Fetch the JSON result
const responseData = response.json();
*/

// how to list out assignments in the extension
var i;
for (i = 0; i < 10; i++)
{
  const body = document.querySelector('body');
  const div = document.createElement('div')
  div.setAttribute('class', 'modal-content');
  body.append(div);

  const p = document.createElement('p');
  div.append(p);
  p.innerHTML = ("Assignment " + i);
}
