src/
│── api/                  # Axios/Fetch API calls
│   └── userApi.js
│
│── assets/               # Images, icons, fonts
│
│── components/           # Reusable UI components
│   ├── Button.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
│
│── pages/                # Route-level components (screens)
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
│
│── features/             # Domain-specific logic (if using Redux Toolkit)
│   └── auth/
│       ├── authSlice.js
│       └── AuthService.js
│
│── hooks/                # Custom React hooks
│   └── useAuth.js
│
│── context/              # React Context API (if not Redux)
│   └── AuthContext.jsx
│
│── utils/                # Helper functions
│   └── formatDate.js
│
│── styles/               # Global CSS / Tailwind / Styled Components
│   └── global.css
│
│── App.jsx               # Main app component
│── index.js              # React entry point
│── routes.js             # Centralized route definitions
