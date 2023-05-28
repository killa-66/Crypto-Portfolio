 class Api {
  getCoins(current: number, pageSize: number) {
    return fetch(`https://api.coincap.io/v2/assets?limit=${pageSize}&offset=${(current - 1) * pageSize}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token'
      }
    })
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => {
        console.log(error);
      });
  }
  searchCoin(coin: string) {
    return fetch(`https://api.coincap.io/v2/assets/${coin}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token'
      }
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const api = new Api