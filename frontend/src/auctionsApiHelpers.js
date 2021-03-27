const { API_URL } = process.env;

const responseHandler = async (res) => {
  const data = await res.json();

  if (res.status >= 400) {
    throw {
      status: res.status,
      message: data.message || res.statusText
    }
  }

  return data;
}

export const getAuctionItems = async ({ page = 1, q, orderBy, token }) => {
  const queryParams = { page };

  if (q) {
    queryParams.q = q;
  }

  if (orderBy) {
    queryParams.order_by = orderBy;
  }

  return await fetch(
    `${API_URL}/auctions?${new URLSearchParams(queryParams)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then(responseHandler);
};

export const getAuctionItemDetails = async ({ id, token }) => {
  return await fetch(`${API_URL}/auctions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(responseHandler);
};

export const login = async ({ username, password, token }) => {
  const body = {
    username,
    password
  };

  return await fetch(`${API_URL}/users/login`, {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(responseHandler);
};

export const bid = async ({ bid, max_bid, id, token }) => {
  const body = {
    bid,
    max_bid
  };

  return await fetch(`${API_URL}/auctions/${id}/bid`, {
    method: 'post',
    body:    JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then(responseHandler);
};