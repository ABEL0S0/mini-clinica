import { Router, Request, Response, NextFunction } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { createAppointmentValidator } from '../validators/appointment.validator';
import { validationResult } from 'express-validator';

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
next();
};

router.get('/', AppointmentController.getAll);

router.post('/', createAppointmentValidator, validate, AppointmentController.create);

router.get('/:id', AppointmentController.getById);
router.delete('/:id', AppointmentController.delete);
router.put('/:id', createAppointmentValidator, validate, AppointmentController.update);
router.patch('/:id/status', AppointmentController.updateStatus);

export default router;
