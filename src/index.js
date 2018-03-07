import "regenerator-runtime/runtime";
import "es6-promise/auto"
import Api from "./api";

let container = document.getElementById('response');

window.load = async function (state) {
  container.innerHTML = 'Loading...';
  let response;

  try {
    response = await Api.get('/api.php', {state});

  } catch (e) {
    if (e instanceof Api.ServerError) {
      console.error('caught server err');
      console.dir(e);
      container.innerHTML =  e.toString();
      return;
    }

    container.innerHTML = 'error... ' + e.toString();
    throw e;
  }

  console.log(response);
  container.innerHTML = JSON.stringify(response, null, 2);
};
