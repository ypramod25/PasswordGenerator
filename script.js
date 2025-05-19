function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const special = document.getElementById('special').checked;

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+{}:"<>?|[];,./`~';

  let allChars = '';
  let password = '';

  const requiredChars = [];

  if (uppercase) {
    allChars += uppercaseChars;
    requiredChars.push(randomChar(uppercaseChars));
  }
  if (lowercase) {
    allChars += lowercaseChars;
    requiredChars.push(randomChar(lowercaseChars));
  }
  if (numbers) {
    allChars += numberChars;
    requiredChars.push(randomChar(numberChars));
  }
  if (special) {
    allChars += specialChars;
    requiredChars.push(randomChar(specialChars));
  }

  const passwordContainer = document.getElementById('password');
  const strengthContainer = document.getElementById('strength');

  if (allChars === '') {
    passwordContainer.innerText = 'Please select at least one option!';
    strengthContainer.innerText = '';
    return;
  }

  // Fill the rest of the password
  for (let i = requiredChars.length; i < length; i++) {
    password += randomChar(allChars);
  }

  // Shuffle final password (to mix required characters)
  password += requiredChars.join('');
  password = shuffleString(password);

  passwordContainer.innerText = password;
  showStrength(password);
}

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
  return str.split('').sort(() => 0.5 - Math.random()).join('');
}

  
  function showStrength(password) {
    const strengthContainer = document.getElementById('strength');
    let strength = 0;
  
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
  
    if (strength <= 1) {
      strengthContainer.innerText = 'Weak Password';
      strengthContainer.className = 'strength-weak';
    } else if (strength === 2 || strength === 3) {
      strengthContainer.innerText = 'Medium Password';
      strengthContainer.className = 'strength-medium';
    } else {
      strengthContainer.innerText = 'Strong Password';
      strengthContainer.className = 'strength-strong';
    }
  }
  
  function copyPassword() {
    const passwordText = document.getElementById('password').innerText;
    if (!passwordText || passwordText === 'Please select at least one option!') {
      alert('Nothing to copy!');
      return;
    }
  
    navigator.clipboard.writeText(passwordText)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy password.');
      });
  }
  