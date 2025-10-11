import OrderModel from "../models/orderScheme.js";


// Get all orders
// Get orders for the current user
export const getOrders = async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

export const getALlOrders = async (req, res)=>{
   try {
    const orders = await OrderModel.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create order
export const createOrder = async (req, res) => {
  try {
    const order = new OrderModel({ ...req.body, user: req.user._id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch {
    res.status(404).json({ error: 'Order not found' });
  }
};
