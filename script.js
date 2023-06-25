const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('username-input');
const userDetails = document.getElementById('user-details');

const API_URL = 'https://api.github.com/users/';

async function fetchUserData(username) {
  try {
    const response = await fetch(API_URL + username);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function displayUserData(user) {
  userDetails.innerHTML = '';

  if (user) {
    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;
    avatar.alt = 'User Avatar';
    avatar.classList.add('avatar');
    userDetails.appendChild(avatar);

    const name = document.createElement('h2');
    name.innerText = user.name;
    userDetails.appendChild(name);

    const bio = document.createElement('p');
    bio.innerText = user.bio;
    userDetails.appendChild(bio);

    const link = document.createElement('a');
    link.href = user.html_url;
    link.target = '_blank';
    link.innerText = 'Visit Profile';
    userDetails.appendChild(link);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'User not found!';
    userDetails.appendChild(errorMessage);
  }
}

function searchUser() {
  const username = usernameInput.value.trim();
  if (username !== '') {
    fetchUserData(username)
      .then((user) => {
        displayUserData(user);
      })
      .catch((error) => {
        console.error(error);
        displayUserData(null);
      });
  }
}

// Event listeners
searchBtn.addEventListener('click', searchUser);
