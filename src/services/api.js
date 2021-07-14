import { baseURL } from "../constants";

export async function login({ username, password }) {
  let url = new URL(`${baseURL}/login`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function register({ username, password }) {
  let url = new URL(`${baseURL}/register`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

export function getAllIncomeEntries(cardId, date) {
  // let url = new URL(`http://107.22.18.203/sales`);
  let url = new URL(`${baseURL}/income`);

  let params = {
    card_id: cardId,
    date,
  };

  Object.keys(params).forEach((val) => {
    if (params[val]) {
      url.searchParams.append(val, params[val]);
    }
  });

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res;
    })
    .catch((e) => console.log("Error:", e));
}

export function addIncomeEntry(
  card_id,
  sales_rep_id,
  amount_paid,
  date = "",
  description
) {
  // let url = new URL(`http://107.22.18.203/sale`);
  let url = new URL(`${baseURL}/income`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "POST",
    body: Boolean(date)
      ? JSON.stringify({
          card_id,
          sales_rep_id,
          date,
          amount_paid,
          description,
        })
      : JSON.stringify({ card_id, sales_rep_id, amount_paid, description }),
  })
    .then((data) => data.json())
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((e) => console.log("Error:", e));
}

export function updateIncomeEntry(id, body) {
  // let url = new URL(`http://107.22.18.203/sales/${id}`);
  let url = new URL(`${baseURL}/income/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}

export function deleteIncomeEntry(id) {
  // let url = new URL(`http://107.22.18.203/sales/${id}`);
  let url = new URL(`${baseURL}/income/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "DELETE",
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}

export function filterSales(val) {
  if (typeof val === "object") {
    let url = new URL(
      `${baseURL}/filter?start=${val.startDate}&end=${val.endDate}`
    );
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      },
    })
      .then((result) => result.json())
      .then((res) => res)
      .catch((e) => console.log("ERROR while filtering sales FE:", e));
  } else {
    let url = new URL(`${baseURL}/filter?by=${val}`);
    return fetch(url)
      .then((result) => result.json())
      .then((res) => res)
      .catch((e) => console.log("ERROR while filtering sales FE:", e));
  }
}

export function getAllExpensesEntries(cardId, date) {
  // let url = new URL(`http://107.22.18.203/sales`);
  let url = new URL(`${baseURL}/expense`);

  let params = {
    cardId,
    date,
  };

  Object.keys(params).forEach((val) => {
    if (params[val]) {
      url.searchParams.append(val, params[val]);
    }
  });

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res;
    })
    .catch((e) => console.log("Error:", e));
}

export function addExpenseEntry(
  sales_rep_id,
  amount_paid,
  date = "",
  description
) {
  // let url = new URL(`http://107.22.18.203/sale`);
  let url = new URL(`${baseURL}/expense`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "POST",
    body: Boolean(date)
      ? JSON.stringify({
          sales_rep_id,
          date,
          amount_paid,
          description,
        })
      : JSON.stringify({ sales_rep_id, amount_paid, description }),
  })
    .then((data) => data.json())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}

export function updateExpenseEntry(id, body) {
  // let url = new URL(`http://107.22.18.203/sales/${id}`);
  let url = new URL(`${baseURL}/expenses/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}

export function deleteExpenseEntry(id) {
  // let url = new URL(`http://107.22.18.203/sales/${id}`);
  let url = new URL(`${baseURL}/expenses/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
    method: "DELETE",
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}
