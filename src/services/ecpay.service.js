const API_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/ecpay`;

class EcpayService {
  payOrder(orderData) {
    window.location.href = `${API_URL}/payment?amount=${orderData.totalPrice}&items=${orderData.itemsName}`;
  }
}

export default new EcpayService();
