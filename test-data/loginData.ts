/**
 * Test data for the E-commerce login page testing.
 */
export const loginData = {
  validUsers: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    performanceGlitch: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
    },
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  expectedErrors: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
  },
  placeholders: {
    username: 'Username',
    password: 'Password',
  },
} as const;
