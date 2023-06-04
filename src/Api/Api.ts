 class Api {
  getCoins(current: number, pageSize: number) {
    return fetch(`https://api.coincap.io/v2/assets?limit=${pageSize}&offset=${(current - 1) * pageSize}`, {
      headers: {
        'Content-Type': 'application/json',
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
    return fetch(`https://api.coincap.io/v2/assets?search=${coin}`,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(console.log);
  }
}

export const api = new Api