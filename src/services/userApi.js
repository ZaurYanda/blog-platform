// userApi.js
const updateUser = async (userData, token) => {
  const response = await fetch('https://blog-platform.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: userData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData.errors));
  }

  return response.json();
};

export default updateUser;
