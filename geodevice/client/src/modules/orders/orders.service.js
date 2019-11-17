class OrdersService {
static async getList () {
  const response = await fetch ('http://localhost:3001/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = response.json()
  return data
  }
}

export default OrdersService;
