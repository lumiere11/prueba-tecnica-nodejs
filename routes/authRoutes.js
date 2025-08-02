const express = require('express');
const { register, login } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { userRegisterSchema, userLoginSchema } = require('../schemas/userSchema');
const authMiddleware = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/register', validate(userRegisterSchema), register);
router.post('/login', validate(userLoginSchema), login);

// Ruta protegida de ejemplo
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Perfil privado', user: req.user });
});

module.exports = router;
