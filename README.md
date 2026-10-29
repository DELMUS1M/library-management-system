# Library Management System - Reading List, Auth Flow & Space Booking Form

This module implements the state layer and user interaction flows for the Library Management System:
- **Reading List Context**: React `useReducer` managing `ADD_BOOK`, `REMOVE_BOOK`, and `CLEAR_LIST`, persisted across sessions in `localStorage`.
- **Authentication & Authorization**: Controlled `LoginPage` and `RegisterPage` issuing JWTs and storing credentials; protected routes guarded by `ProtectedRoute`.
- **Space Booking Form**: Controlled reservation form (`SpaceBookingPage`) with dropdown choices, date picker, start/end time slots, and validation.
- **Navbar Integration**: Displays real-time reading list items count badge and user auth state.

## Required Files Included
- `client/src/context/ReadingListContext.jsx`
- `client/src/App.jsx`
- `client/src/pages/LoginPage.jsx`
- `client/src/pages/RegisterPage.jsx`
- `client/src/components/ProtectedRoute.jsx`
- `client/src/pages/SpaceBookingPage.jsx`
- `client/src/components/Navbar.jsx`
- `client/.env`

## Local Development
```bash
cd client
npm install
npm run dev
```
