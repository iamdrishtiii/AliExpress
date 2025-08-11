const User = require('../models/userSchema')

const getCart = async (req, res) => {
       const { userId } = req.user;
       if (!userId) {
              return res.status(401).json({ message: 'User nhi mila' })
       }

       try {
              const user = await User.findById(userId);
              res.status(200).json({ cart: user.cart })
       } catch (error) {
              res.status(500).json({ message: 'Cart se data nhi aa rha kyuki', error: error.message })
       }
}

const addToCart = async (req, res) => {
       const userId = req.user.userId
       const { productId, title, image, price, discount } = req.body

       if (!productId || !title || !image || !price || !discount) {
              return res.status(401).json({ message: "Data insufficient" })
       }
       try {
              const user = await User.findById({ _id: userId })

              const alreadypresent = user.cart.some((item) => item.productId == productId)

              if (alreadypresent) {
                     return res.status(401).json({ message: 'Already added in the cart' });
              }

              user.cart.push({ productId, title, image, price, discount })
              await user.save();

              return res.status(200).json({ message: 'Added to cart!', cart: user.cart })
       } catch (error) {
              return res.status(401).json({ message: error.message })
       }
}

const removeFromCart = async (req, res) => {
       const userId = req.user.userId;
       const { productId } = req.params

       if (!productId) {
              return res.status(401).json({ message: 'productId not found' })
       }
       try {
              const user = await User.findById({ _id: userId })

              const initialLength = user.cart.length;

              user.cart = user.cart.filter(
                     (item) => item.productId !== productId
              );

              if (user.cart.length === initialLength) {
                     return res.status(404).json({ message: 'Product not found' });
              }

              await user.save();
              res.status(200).json({ message: 'Product removed!', cart: user.cart });

       } catch (error) {
              res.status(500).json({ message: 'Failed to delete from cart', error: error.message });
       }
}

module.exports = { getCart, addToCart, removeFromCart }