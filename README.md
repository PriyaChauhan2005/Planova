🚀 Planova: Student Productivity Reimagined
Planova is a full-stack student productivity application designed to help students manage tasks, track streaks, and plan their academic schedules with ease. Built with the MERN stack and integrated with Clerk for secure authentication, it offers a stylized, aesthetic interface for modern learners.

✨ Features
Smart Dashboard: Real-time overview of your daily tasks, deadlines, and current productivity streak.

Planning Station: Dedicated space to organize upcoming tasks with specialized filtering for "Tomorrow's List".

Streak Tracking: Gamified productivity system that tracks consistent daily task completion.

Deadlines & Reminders: integrated system to ensure important academic dates are never missed.

User Authentication: Secure sign-in and sign-up powered by Clerk, supporting social logins and student profiles.

🛠️ Tech Stack
Frontend
React.js: Functional components and Hooks for dynamic UI.

Tailwind CSS: Stylized, responsive design with custom aesthetic themes.

Lucide React: For high-quality, lightweight iconography.

Axios: For structured API communication with the backend.

Backend
Node.js & Express: Scalable server-side logic and RESTful API architecture.

MongoDB Atlas: Cloud-hosted NoSQL database for flexible data modeling.

Mongoose: Schema-based solution for modeling application data.

Clerk: Industry-standard authentication and user management.

📂 Project Structure

Planova/
├── backend/
│   ├── models/         # Mongoose schemas (Task, User, Reminder)
│   ├── routes/         # Express API routes
│   ├── .env            # Environment variables (Atlas URI)
│   └── server.js       # Main entry point & Atlas connection
├── frontend/
│   ├── src/
│   │   ├── components/ # Header, Sidebar, TaskContainer
│   │   ├── context/    # UserContext for global state
│   │   ├── services/   # Axios API configurations
│   │   └── pages/      # Dashboard, Plan, Settings
│   └── main.jsx        # ClerkProvider setup


🚀 Deployment

Planova is architected for modern cloud deployment:
Frontend      Vercel 
Backend       Render
Database      MongoDB Atlas
Auth          Clerk



🔧 Installation & Setup

Clone the repository:
git clone https://github.com/Priyachauhan2005/Planova.git

Install dependencies:
Backend: cd backend && npm install
Frontend: cd frontend && npm install

Environment Variables:
Create a .env in /backend with MONGODB_URI and PORT.
Create a .env in /frontend with VITE_CLERK_PUBLISHABLE_KEY.

Run Locally:
Backend: npm run server
Frontend: npm run dev


👨‍💻 About the Developer

I am a web developer with a passion for creating tools that bridge the gap between technology and productivity. Planova was born out of my interest in building student-focused applications that solve real-world scheduling challenges.
Through this project, I have gained hands-on experience in:
Full-Stack Integration: Connecting a React frontend with a Node.js/Express backend and MongoDB Atlas.
Advanced Debugging: Resolving complex C++ logic and JavaScript/React syntax errors to ensure a seamless user experience.
Secure Authentication: Implementing Clerk to manage user profiles and secure data access.
Responsive Styling: Designing stylized, aesthetic interfaces that cater to specific user preferences, such as stylized photo themes and clean dashboard layouts.
I am constantly learning and expanding my stack, currently exploring advanced concepts in React and Node.js through courses like the "Sigma Web Development Course".
