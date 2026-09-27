import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // For seamless demo operation, if no token, check for demo header or fallback to mock user
    const demoRole = req.headers['x-demo-role'];
    if (demoRole) {
      req.user = {
        _id: demoRole === 'teacher' ? 'user-teacher-1' : demoRole === 'independent' ? 'user-independent-1' : 'user-student-1',
        name: demoRole === 'teacher' ? 'Ms. Sarah Vance' : demoRole === 'independent' ? 'Alex Rivera' : 'Maya Lin',
        role: demoRole
      };
      return next();
    }
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'offline_orbit_jwt_secret_key_2026_super_secure');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token validation failed' });
  }
};
