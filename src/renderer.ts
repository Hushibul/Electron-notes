import './index.css';

type userCardType = {
  _id: string;
  heading: string;
  name: string;
  password: string;
};
const name = document.getElementById('name') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const userInfo = document.getElementById('user-data') as HTMLDivElement;

document.querySelector('#add').addEventListener('click', async (e) => {
  e.preventDefault();

  if (name.value === '' && password.value === '') {
    createNotification('Error', 'Name and Password can not be empty');
  } else {
    const data = {
      name: name.value,
      password: password.value,
    };

    await fetch('http://localhost:5000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => createNotification('Successful', data?.message))
      .catch((error) => console.error('Error:', error));

    name.value = '';
    password.value = '';
  }

  window.location.reload();
});

document.addEventListener('DOMContentLoaded', async function () {
  const userData = await fetch('http://localhost:5000/api/all')
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  if (userData && userData.data) {
    userData.data.map((item: userCardType, index: number) => {
      const card = document.createElement('div');
      card.className = 'card';
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger delete-btn';

      const editButton = document.createElement('button');
      editButton.className = 'btn text-light btn-warning mt-2 edit-btn';

      const updateButton = document.createElement('button');
      updateButton.className = 'btn btn-success mt-2 update-btn';

      const cardHeading = document.createElement('h4');
      const name = document.createElement('p');
      const password = document.createElement('p');

      cardHeading.textContent = `Card ${index + 1}`;
      name.textContent = `Name: ${item.name}`;
      password.textContent = `Password: ${item.password}`;
      deleteButton.textContent = 'Delete';
      updateButton.textContent = 'Update';
      editButton.textContent = 'Edit';

      card.appendChild(cardHeading);
      card.appendChild(name);
      card.appendChild(password);
      card.appendChild(deleteButton);
      card.appendChild(editButton);
      card.appendChild(updateButton);

      userInfo.appendChild(card);

      document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', function () {
          deleteUser(item._id);
        });
      });
      document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', function () {
          editUser(item?.name, item?.password);
        });
      });
      document.querySelectorAll('.update-btn').forEach((button) => {
        button.addEventListener('click', function () {
          updateUser(item?._id);
        });
      });
    });
  }
});

function editUser(names: string, passwords: string) {
  name.value = names;
  password.value = passwords;
}

async function updateUser(id: string) {
  if (name.value === '' && password.value === '') {
    createNotification('Error', 'Name and Password can not be empty');
  } else {
    const data = {
      name: name.value,
      password: password.value,
    };

    await fetch(`http://localhost:5000/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => createNotification('Successful', data?.message))
      .catch((error) => console.error('Error:', error));

    name.value = '';
    password.value = '';
  }

  window.location.reload();
}

async function deleteUser(id: string) {
  await fetch(`http://localhost:5000/api/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => createNotification('Successful', data?.message))
    .catch((err) => console.log(err));

  window.location.reload();
}

function createNotification(title: string, body: string): void {
  new window.Notification(title, {
    body: body,
  });
}
