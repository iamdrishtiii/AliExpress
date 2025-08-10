const User = require('../models/userSchema')

const getWishlist = async (req, res) => {
    const { userId } = req.user;
    if (!userId) {
        return res.status(401).json({ suceess: false, message: 'User not found' })

    }
    try {
        const user = await User.findById(userId);
        res.status(200).json({ wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch wishlist items', error: err.message });
    }
}

const addToWishlist = async (req, res) => {
    const userId = req.user.userId;
    const { productId, title, image, price, discount } = req.body;

    if (!productId || !title || !image || !price || !discount) {
        return res.status(401).json({ suceess: false, message: 'Require data is not provided' })
    }

    try {
        const user = await User.findById({ _id: userId })

        const alreadypresent = user.wishlist.some((item) => item.productId === productId);

        if (alreadypresent) {
            return res.status(401).json({ message: 'Already added in the wishlist' });
        }

        user.wishlist.push({ productId, title, image, price, discount });

        await user.save();

        return res.status(200).json({ message: 'Added to wishlist!', wishlist: user.wishlist });

    } catch (error) {
        return res.status(401).json({ suceess: false, message: error.message })
    }
}


const removeFromwishlist = async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params

    if (!productId) {
        return res.status(401).json({ suceess: false, message: 'productId not found' })
    }

    try {
        const user = await User.findById({ _id: userId })

        const initialLength = user.wishlist.length;

        user.wishlist = user.wishlist.filter(
            (item) => item.productId !== productId
        );

        if (user.wishlist.length === initialLength) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await user.save();
        res.status(200).json({ message: 'Product removed!', wishlist: user.wishlist });

    } catch (error) {
        res.status(500).json({ message: 'Failed to delete from wishlist', error: err.message });
    }
}

module.exports = { getWishlist, addToWishlist, removeFromwishlist }