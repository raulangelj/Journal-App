export const initialState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
  errorCode: null,
}

export const authenticatedState = {
  status: "authenticated",
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
  errorCode: null,
}

export const notAuthenticatedState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
  errorCode: null,
}

export const demoUser = {
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg',
  password: '1234567',
}