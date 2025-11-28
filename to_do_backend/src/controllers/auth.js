'use strict';

const authService = require('../services/auth');

class AuthController {
  /**
   * PUBLIC_INTERFACE
   * Handle user registration.
   * Body: { email: string, password: string }
   * Returns: 201 Created with { success, message, token, user }
   */
  async register(req, res) {
    try {
      const { email, password } = req.body || {};
      const result = authService.register(email, password);
      return res.status(201).json(result);
    } catch (err) {
      const status = err.status || 400;
      return res.status(status).json({
        success: false,
        message: err.message || 'Registration failed',
      });
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Handle user login.
   * Body: { email: string, password: string }
   * Returns: 200 OK with { success, message, token, user }
   */
  async login(req, res) {
    try {
      const { email, password } = req.body || {};
      const result = authService.login(email, password);
      return res.status(200).json(result);
    } catch (err) {
      const status = err.status || 400;
      return res.status(status).json({
        success: false,
        message: err.message || 'Login failed',
      });
    }
  }
}

module.exports = new AuthController();
