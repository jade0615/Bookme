import { Router } from 'express';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Register endpoint not implemented yet'
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Login endpoint not implemented yet'
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Logout endpoint not implemented yet'
  });
});

export { router as authRoutes };