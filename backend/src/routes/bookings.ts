import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Bookings endpoint not implemented yet'
  });
});

export { router as bookingRoutes };