// this is to expose the errors to popError. could pass it in, but... can't easily pop errors from the 'more' link that way
// just doing it this way so that the errors can be easily popped from a dynamically generated link with innerHTML and not be a giant pita
var errors = [];
var errorPaneState = false;

// Does validtions of the form fields, like a boss
function validate () {
    // clear any previous errors
    errors = [];

    var user = document.getElementById('username');
    var pass = document.getElementById('password');
    var userWrap = document.getElementById('usernameWrapper');
    var passWrap = document.getElementById('passwordWrapper');

    // clear visual error feedback on input fields
    userWrap.style.border = 'solid .2em transparent';
    passWrap.style.border = 'solid .2em transparent';

    // check password for non alphanumeric
    if (!(/\W/.test(pass.value))) {
        errors.push('Your password must have a symbol.');
        passWrap.style.border = 'solid .2em #ED1C24';
    }
    // check password for uppercase letter
    if (!(/[A-Z]/.test(pass.value))) {
        errors.push('Your password must have a capital letter.');
        passWrap.style.border = 'solid .2em #ED1C24';
    }
    // check password length
    if (pass.value.length < 6) {
        errors.push('Password must be at least 6 characters.');
        passWrap.style.border = 'solid .2em #ED1C24';
    }
    // check to see if username is not empty, and contains at least one non-whitespace character
    if (user.value === '' || !(/\S/.test(user.value))) {
        errors.push('Your username cannot be blank.');
        userWrap.style.border = 'solid .2em #ED1C24';
    }

    // if we dun goofed
    if (errors.length > 0) {
        // pop the first error message
        popError();
    } else {
        // otherwise, clear the error message pane, if shown
        hideError();
    }

    // returns true if no errors, false if any errors occured
    return errors.length === 0;
}

// Pop an error, using everyone's favorite red div
function popError() {
    // make us aware that there's an actual error pane up
    errorPaneState = true;
    var errorPane = document.getElementById('errorPane');
    var more = '';
    var message = errors.pop();
    if (errors.length > 0) {
        // Pop additional errors, if any, from dynamically generated link
        more = ' <a href="#" onclick="popError()">(+' + errors.length + ')</a>';
    }
    errorPane.innerHTML = '<span>' + message + more + '</span>';
    errorPane.style.height = '0';
    errorPane.style.transition = 'height 100ms ease-out';
    errorPane.style.opacity = '1';
    errorPane.style.height = '4em';
}

// Hide the error pane
function hideError() {
    // this way we only trigger hide behavior if there is an actual error on the screen.
    // prevents some weirdybeardy stuff with the animation from happening
    // if you click into the fields to dismiss the message and then submit again too fast.
    if (errorPaneState) {
        var errorPane = document.getElementById('errorPane');
        errorPane.style.transition = 'opacity 333ms linear';
        errorPane.style.opacity = '0';

        // timeout is used to prevent the pane instantly disappearing by blinking out to 0 height during fade out
        setTimeout(function() { errorPane.style.height = '0' }, 501);
        errorPaneState = false;
    }
}

// Toggles password visibility, like a miniboss
function togglePassword () {
    var pass = document.getElementById('password');

    // There's probably a thousand better ways to do this
    // but doing it this way for the sake of simplicity.  Works IE 9+ but pops a warning
    if (pass.type === 'password') {
        pass.type = 'text';
    } else {
        pass.type = 'password';
    }
}