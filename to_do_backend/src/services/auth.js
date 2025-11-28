'use strict';

/**
 * Simple in-memory user store and auth logic.
 * This is a placeholder; replace with a real DB and JWT in production.
 */
class AuthService {
  constructor() {
    /** @type {Array<{id:string,email:string,password:string,createdAt:string}>} */
    this.users = [];
  }

  /**
   * PUBLIC_INTERFACE
   * Register a new user if the email is not already taken.
   * Returns a minimal auth payload with a token placeholder.
   */
  register(email, password) {
    this.#validateEmailAndPassword(email, password);

    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }

    const user = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      email,
      // WARNING: Do not store plain text passwords in real apps. Use bcrypt/argon2.
      password,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);

    return {
      success: true,
      message: 'User registered',
      token: this.#makeToken(user),
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    };
  }

  /**
   * PUBLIC_INTERFACE
   * Login an existing user using email/password.
   * Returns a minimal auth payload with a token placeholder.
   */
  login(email, password) {
    this.#validateEmailAndPassword(email, password);

    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      const err = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }

    return {
      success: true,
      message: 'Login successful',
      token: this.#makeToken(user),
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    };
  }

  #validateEmailAndPassword(email, password) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      const err = new Error('Email is required and must be valid');
      err.status = 400;
      throw err;
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      const err = new Error('Password is required and must be at least 6 characters');
      err.status = 400;
      throw err;
    }
  }

  #makeToken(user) {
    // JWT-like placeholder; replace with real JWT in production.
    // Encodes user id/email and an expiry hint.
    const payload = {
      sub: user.id,
      email: user.email,
      exp: Date.now() + 1000 * 60 * 60, // 1h
      typ: 'mock',
      iss: 'to_do_backend',
    };
    const base64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    return `mock.${base64}.token`;
  }
}

module.exports = new AuthService();
