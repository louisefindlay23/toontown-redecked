const loginForm = document.getElementById("ttr-login");
let appToken = null;
let authToken = null;

loginForm.addEventListener("submit", () => {
  event.preventDefault();
  console.info("Form submitted");
  const loginFormData = new FormData(loginForm);
  const username = loginFormData.get("username");
  const password = loginFormData.get("password");
  login(username, password);
});

function login(username, password, appToken, authToken) {
  fetch("https://www.toontownrewritten.com/api/login?format=json", {
    method: "POST",
    body: {
      username: username,
      password: password,
      appToken: appToken,
      authToken: authToken,
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
      switch (data.success) {
        case "false":
          console.info("Failure");
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          break;
        case "partial":
          console.info("Partial");
          document.getElementById("ttr-login-error").innerHTML = data.banner;
          const authToken = data.responseToken;
          let tfaForm = document.getElementById("ttr-tfa");
          tfaForm = new FormData(tfaForm);
          const appToken = form.get("tfa-token");
          login(username, password, authToken, appToken);
          break;
        case "delayed":
          // code block
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
