const OrderSummary = ({ sessionData }) => {

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Order ID: {sessionData.id}</p>
      <p>Total Amount: ¥{sessionData.amount_total / 100}</p>
      <p>Shipping Address: {sessionData.customer_details.address.country}</p>
      <div>
        <h3>Line Items</h3>
        {sessionData.line_items.data.map((item) => (
          <div key={item.id}>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ¥{item.amount_total / 100}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;