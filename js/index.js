
function reset() {
  document.getElementById("number").className = "";
  document.getElementById("error").style.display = "none";
}

function loaderOn() {
  document.getElementById("spinner-wrapper").style.display = "flex";
}
function loaderOff() {
  document.getElementById("spinner-wrapper").style.display = "none";
}

function getUserNum() {
  return (document.getElementById("number").value);
}

function useData(data) {
  reset();
  loaderOff();
  document.getElementById("answer").className = "answer";
  document.getElementById("answer").innerText = data;
  }

  function errorFortyTwo(data) {
    reset();
    loaderOff();
    document.getElementById("answer").innerText = data;
    document.getElementById("answer").className = "answer1";
  }

  function errorFiftyOne () {
    loaderOff();
    document.getElementById("answer").innerText = "";
    document.getElementById("number").className = "input1";
    document.getElementById("error").style.display = "inline";
  }

  function showHistory() {
    let ul = document.getElementById('list');
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    let link = `http://localhost:5050/getFibonacciResults`;
      fetch(link).then(response => {
        response.json().then(data => { 
          data.results.sort((a,b) => (a.createdDate > b.createdDate) ? 1 : -1);
          for (let i = 1; i < 4; ++i) {
            let item = document.createElement('li');
            let index = data.results.length - i;
            let date = new Date(data.results[index].createdDate);
            item.innerHTML = `The Fibonacci Of  <b>${data.results[index].number}</b>  is  <b>${data.results[index].result}</b>, Calculated at: ${date.toUTCString()} +0200 (Israel Standard Time)`;
            document.getElementById('list').appendChild(item);
          }
        });
      });
  }

function myFibonacci(number) {
  if (number === 0 || number === 1) 
    return (1);
  return (myFibonacci(number - 1) + myFibonacci(number - 2));
}

  function getFibonacci(number) {
    const link = `http://localhost:5050/fibonacci/${number}`;
        fetch(link).then(response => {
          if (response.ok) {
            return (response.json())
          .then(data => { 
              useData(data.result);
              showHistory();
           })
          } else {
            response.text()
            .then(err => {
              errorFortyTwo(err);
            })
           }
        })
  }

function saveCalculation() {
  loaderOn();
  let number = getUserNum();
    if (number < 51) {
     getFibonacci(number);
    } else {
      errorFiftyOne();
    }
}

function dontSave() {
  loaderOn();
  const number = getUserNum();
  const fibNum = myFibonacci(number);
  useData(fibNum);
}


showHistory();

document.getElementById('btn').addEventListener("click", () => {
  const checkBox = document.getElementById('flexCheckDefault');
  if (checkBox.checked) {
    saveCalculation();
  } else {
    dontSave();
  }
});


