export function getSalesEntries(cardId, date) {
  let url = new URL(`http://127.0.0.1:3000/sales`);
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

export function addSalesEntry(cardId, salesRepId, amount, date = "") {
  let url = new URL(`http://127.0.0.1:3000/sale`);

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: Boolean(date)
      ? JSON.stringify({ cardId, salesRepId, date, amount })
      : JSON.stringify({ cardId, salesRepId, amount }),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => console.log("Error:", e));
}
