### SP Melodic - Music Player  
SP Melodic is a modern web application for playing music based on Spotify, developed using React, TypeScript, Vite, TailwindCSS, and Zustand on the frontend, and Node.js, Express, MongoDB/MySQL, and JWT on the backend. The app allows users to authenticate, search for songs, play music, mark songs as favorites, and, if they have admin permissions, manage the song catalog (upload, edit, and delete).  

---

### Key Features  

#### Frontend  
- **Music Playback**: Play songs with basic controls (play/pause, next, previous, volume).  
- **Authentication**: Users can sign up and log in.  
- **Search**: Search for songs by name or artist.  
- **Favorites**: Users can mark songs as favorites and filter the list to view only their favorites.  
- **Admin Panel**: Admin users can upload, edit, and delete songs.  
- **Responsive Design**: Optimized for both mobile and desktop devices.  

#### Backend  
- **JWT Authentication**: Registration, login, and token renewal.  
- **Song Management**: Full CRUD functionality for songs, including marking them as favorites.  
- **File Management**: Upload and delete audio files and images.  
- **Swagger**: API documentation available at `/api-docs`.  
- **Unit Testing**: Automated testing for key endpoints.  

---

### Technologies Used  

#### Frontend  
- React  
- TypeScript  
- Vite  
- TailwindCSS  
- Zustand (state management)  
- React Router (routing)  
- Axios (HTTP requests)  
- React Query (data management)  
- Lucide React (icons)  

#### Backend  
- Node.js  
- Express  
- MongoDB or MySQL (depending on the configuration)  
- JWT (authentication)  
- Multer (file management)  
- Swagger (API documentation)  
- Jest (unit testing)  

---

### Prerequisites  
Before running the project, ensure you have the following installed:  
- Node.js (v16 or higher)  
- npm or yarn (package manager)  
- MongoDB or MySQL (depending on the backend configuration)  

---

### Project Setup  

#### Frontend  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/carloscarrete-sp-music.git  
   cd carloscarrete-sp-music  
   ```  

2. Install dependencies:  
   ```bash
   npm install  
   # or  
   yarn install  
   ```  

3. Configure environment variables:  
   - Create a `.env` file in the project root based on the `.env-template` file.  
   - Define the `VITE_API_URL` variable with your backend API URL.  
   Example:  
   ```plaintext
   VITE_API_URL=http://localhost:3000/api/v1  
   ```  

4. Run the project:  
   ```bash
   npm run dev  
   # or  
   yarn dev  
   ```  

5. The application will be available at [http://localhost:5173](http://localhost:5173).  

---

#### Backend  

1. Clone the backend repository:  
   ```bash
   git clone https://github.com/carloscarrete/backend-tracks.git  
   cd backend-tracks  
   ```  

2. Install dependencies:  
   ```bash
   npm install  
   # or  
   yarn install  
   ```  

3. Configure environment variables:  
   - Create a `.env` file in the project root based on the `.env-template` file.  
   - Define necessary variables like `DB_URI`, `JWT_SECRET`, etc.  
   Example:  
   ```plaintext
   NODE_ENV=dev  
   PORT=3000  
   DB_URI=mongodb://localhost:27017/webplayer  
   JWT_SECRET=mysecretkey  
   ```  

4. Run the project:  
   ```bash
   npm start  
   # or  
   yarn start  
   ```  

5. The backend will be available at [http://localhost:3000](http://localhost:3000).  

---

### Project Structure  

#### Frontend  
```plaintext
carloscarrete-sp-music/  
├── public/                 # Public files (images, etc.)  
├── src/                    # Application source code  
│   ├── actions/            # Actions for API interaction  
│   ├── api/                # API configuration (Axios)  
│   ├── assets/             # Static resources (images, fonts, etc.)  
│   ├── auth/               # Authentication logic  
│   ├── entities/           # Domain entities (data models)  
│   ├── helpers/            # Utility functions  
│   ├── interfaces/         # TypeScript interfaces  
│   ├── mappers/            # Data transformation mappers  
│   ├── router/             # Routes configuration (React Router)  
│   ├── store/              # State management (Zustand)  
│   ├── webplayer/          # Player components and pages  
│   ├── App.css             # Global styles  
│   ├── main.tsx            # Application entry point  
│   └── vite-env.d.ts       # Vite type definitions  
├── .env-template           # Environment variables template  
├── eslint.config.js        # ESLint configuration  
├── index.html              # Main application page  
├── package.json            # Project dependencies and scripts  
├── tailwind.config.ts      # TailwindCSS configuration  
├── tsconfig.json           # TypeScript configuration  
├── vite.config.ts          # Vite configuration  
└── README.md               # This file  
```  

#### Backend  
```plaintext
carloscarrete-backend-tracks/  
├── app.js                  # Backend entry point  
├── config/                 # Database configuration  
├── controllers/            # Route handlers  
├── docs/                   # API documentation (Swagger)  
├── middleware/             # Custom middlewares  
├── models/                 # Data models (MongoDB/MySQL)  
├── routes/                 # Route definitions  
├── storage/                # Uploaded file storage  
├── tests/                  # Unit tests  
├── utils/                  # Utilities and helpers  
├── validators/             # Request validators  
├── .env-template           # Environment variables template  
├── package.json            # Project dependencies and scripts  
└── README.md               # Backend documentation  
```  

---

### Available Scripts  

#### Frontend  
- `npm run dev`: Start the development server.  
- `npm run build`: Compile the project for production.  
- `npm run lint`: Run ESLint to check the code.  
- `npm run preview`: Serve the production build locally.  

#### Backend  
- `npm start`: Start the backend server.  
- `npm run dev`: Start the development server with nodemon.  
- `npm test`: Run unit tests.  

---

### Contribution  
If you want to contribute to this project, follow these steps:  
1. Fork the repository.  
2. Create a branch for your feature or fix:  
   ```bash
   git checkout -b my-feature  
   ```  
3. Make your changes and commit them:  
   ```bash
   git commit -m 'Add new feature'  
   ```  
4. Push your changes:  
   ```bash
   git push origin my-feature  
   ```  
5. Open a Pull Request on GitHub.  

---

### License  
This project is licensed under the MIT License. See the LICENSE file for more details.  