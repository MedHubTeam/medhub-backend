const User = require('../routes/user')

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}