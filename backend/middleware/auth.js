const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(401).json({ msg: 'User not found' });
      if (roles && !roles.includes(user.role)) return res.status(403).json({ msg: 'Unauthorized' });
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};
