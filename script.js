function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const special = document.getElementById('special').checked;
  
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (special) charset += '!@#$%^&*()_+{}:"<>?|[];,./`~';
  
    const passwordContainer = document.getElementById('password');
    const strengthContainer = document.getElementById('strength');
  
    if (charset === '') {
      passwordContainer.innerText = 'Please select at least one option!';
      strengthContainer.innerText = '';
      return;
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    passwordContainer.innerText = password;
    showStrength(password);
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
  