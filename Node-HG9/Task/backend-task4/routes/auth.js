
const express = require('express');


const { register, login, changePassword, deleteAccount } = require('../controllers/authController'); // [CHANGED]
const requireAuth = require('../middleware/requireAuth'); 
const requireRole = require('../middleware/requireRole'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.post('/change-password', changePassword); 


router.post('/delete-account', requireAuth, deleteAccount); 


router.get('/admin', requireAuth, requireRole('admin'), (req, res) => {
  return res.json({ ok: true, admin: true, user: { id: req.user.id, role: req.user.role } });
});


router.get('/_routes_ping', (req, res) => res.json({ ok: true }));

module.exports = router;
