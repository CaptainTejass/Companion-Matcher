👥 Companion Matcher(if you want it working i can show it to you that too)
A full-stack mini project that allows users to find potential companions based on shared interests. Users can create profiles, view matched users, and shortlist people they want to connect with.

📌 Features
✅ Create a user profile (name, age, interests)

✅ Retrieve matches based on shared interests (minimum 2)

✅ Shortlist users to build a connections list

✅ Store matched users in a friends column

✅ PostgreSQL database used for persistence

🛠 Tech Stack
Layer	Tech
Frontend	React.js
Backend	Node.js, Express.js
Database	PostgreSQL
HTTP Client	Axios

🗂️ Project Structure

Companion-Matcher/
├── backend/

│   ├── index.js

│   ├── db.js

│   └── routes/

│       └── users.js

├── frontend/

│   └── src/

│       ├── index.js

│       ├── App.js

│       └── components/

│            ├── Form.js

│            └── Matches.js

🚀 Getting Started
📁 Clone the Repository

git clone https://github.com/CaptainTejass/Companion-Matcher.git

cd Companion-Matcher

⚙️ Backend Setup
Navigate to the backend directory:


cd backend

Install dependencies:


npm install

Configure PostgreSQL connection in db.js:


const pool = new Pool({

  user: 'your_pg_user',
  
  host: 'localhost',
  
  database: 'postgres',
  
  password: 'your_pg_password',
  
  port: 5432,
});

Start the backend server:


node index.js

The backend will run on http://localhost:3001

🌐 Frontend Setup

Navigate to the frontend directory:


cd ../frontend

Install dependencies:


npm install

Start the React app:

npm start

The frontend will run on http://localhost:3000

🧪 API Routes Summary
➕ POST /users
Create a new user profile.

Request Body:


{
  "name": "Amit",
  
  "age": 23,
  
  "interests": ["music", "tech", "sports"]
}
🔍 GET /users/matches/:username

Returns a list of users who share at least 2 common interests with the specified user. Also updates the friends column for that user.

❤️ PATCH /users/:username/shortlist

Add a user to the current user’s connections list.

Request Body:

{
  "matchName": "Sanya"
}

screenshot : 
->frontend/public/matcher.jpg

![matcher](https://github.com/user-attachments/assets/fcad2644-2c39-4431-b066-04b3c087b061)



