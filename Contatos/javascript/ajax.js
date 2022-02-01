function Ajax(url, method, body) {
  const fetchData = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    fetchData.body = JSON.stringify(body);
  }

  return fetch(url, fetchData)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}
