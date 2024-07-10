

// function to toggle between login form and registration form
function toggleForm(formId) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('registration-form').classList.add('hidden');
    document.getElementById(formId).classList.remove('hidden');
}

// Function for validating login details
function validateLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    var loginemail = localStorage.getItem('email')
    var loginpassword = localStorage.getItem('password')

    if(email == '' && password == ''){
            alert('Fill all the fields correctly')
        }
    else if (email === loginemail && password=== loginpassword){
        sessionStorage.setItem('isAuthenticated', 'true');
         window.location.href = "home.html"
    }
    else if(email !== loginemail || password !== loginpassword){
        alert('Check login credentials')
    }
    
}

// Function to validate registration details
function validateRegistration() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email_reg').value;
    var password = document.getElementById('password_reg').value;
    var confirm_password = document.getElementById('confirm_password').value;

    
    if (name!= '' && email != '' && password !='' && confirm_password !='' && password === confirm_password){
        localStorage.setItem("name",name)
        localStorage.setItem('email',email)
        localStorage.setItem('password',password)
        toggleForm('login-form')
    }
    else if (name!= '' && email != '' && password !='' && confirm_password !='' && password !== confirm_password){
        alert('Check the password entered')
    }
    else if (name == '' || email == '' || password == '' || confirm_password == '' ){
        alert('Fill all the fields')
    }
}

// Function to clear input fields
function clearFields(fieldIds) {
    fieldIds.forEach(function (fieldId) {
        document.getElementById(fieldId).value = '';
    });
}
