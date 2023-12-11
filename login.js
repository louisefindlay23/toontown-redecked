const loginForm = document.getElementById("ttr-login");

loginForm.addEventListener("submit", () => {
  event.preventDefault();
  console.info("Login form submitted");
  const loginFormData = new FormData(loginForm);
  const username = loginFormData.get("username");
  const password = loginFormData.get("password");
  login(username, password);
});

function login(username, password) {
  fetch("https://www.toontownrewritten.com/api/login?format=json", {
    method: "POST",
    body: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "x-www-form-urlencode",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      console.info(data);
      switch (data.success) {
        case "false":
          console.info("Failure");
          console.info(`Username: ${username} Password: ${password}`);
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          break;
        case "partial":
          console.info("Partial");
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          const authToken = data.responseToken;
          //tfa(username, password, authToken);
          break;
        case "delayed":
          // code block
          console.info("Delayed");
          break;
        case true:
          // code block
          console.info("Success");
          break;
      }
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}

/* function tfa(username, password) {
  fetch("https://www.toontownrewritten.com/api/login?format=json", {
    method: "POST",
    body: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "x-www-form-urlencode",
    },
  })
    .then(function (response) {
      if (response.ok) {
        console.info(response.json());
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      console.log(data);
      switch (data.success) {
        case "false":
          console.info("Failure");
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          break;
        case "partial":
          console.info("Partial");
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          const authToken = data.responseToken;
          break;
        case "delayed":
          // code block
          console.info("Delayed");
          break;
        case true:
          // code block
          console.info("Success");
          break;
        default:
          console.info(data);
      }
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}

const tfaForm = document.getElementById("ttr-tfa");

tfaForm.addEventListener("submit", () => {
  event.preventDefault();
  console.info("Tfa form submitted");
  const tfaFormData = new FormData(tfaForm);
  const appToken = form.get("tfa-token");
  console.info(username, password, authToken, appToken);
  tfa(username, password, authToken, appToken);
});

function tfa() {} */
