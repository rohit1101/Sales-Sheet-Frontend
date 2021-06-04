export function getSalesEntries(cardId, date) {
  // let url = new URL(`http://127.0.0.1:3000/sales`);
  let url = new URL(`http://54.175.205.131/sales`);

  let params = {
    cardId,
    date,
  };

  Object.keys(params).forEach((val) => {
    if (params[val]) {
      url.searchParams.append(val, params[val]);
    }
  });

  return fetch(url)
    .then((data) => data.json())
    .then((res) => {
      return res;
    })
    .catch((e) => console.log("Error:", e));
}

export function addSalesEntry(card_id, sales_rep_id, amount_paid, date = "") {
  // let url = new URL(`http://127.0.0.1:3000/sale`);
  let url = new URL(`http://54.175.205.131/sale`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: Boolean(date)
      ? JSON.stringify({ card_id, sales_rep_id, date, amount_paid })
      : JSON.stringify({ card_id, sales_rep_id, amount_paid }),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => console.log("Error:", e));
}

export function updateSalesEntry(id, body) {
  // let url = new URL(`http://127.0.0.1:3000/sales/${id}`);
  let url = new URL(`http://54.175.205.131/sales/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}

export function deleteSalesEntry(id) {
  // let url = new URL(`http://127.0.0.1:3000/sales/${id}`);
  let url = new URL(`http://54.175.205.131/sales/${id}`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((data) => data.text())
    .then((res) => res)
    .catch((e) => console.log("Error:", e));
}
