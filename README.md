# 🚗 DriveEase - Redesign of Sarthi Parivahan

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/design/i0c6DhTI857DSouWlCwFV2/DriveEase?node-id=0-1&p=f&t=FnllJoQqbtLgTHh3-0)

**DriveEase** is India's smart digital driving licence portal that simplifies the process of applying for, tracking, and managing transport services online. Built with modern web technologies, it provides a seamless user experience for learner's licence, driving licence applications, and appointment scheduling.

## 🎨 Design

View the complete high-fidelity design on Figma:
👉 [DriveEase Figma Design](https://www.figma.com/design/i0c6DhTI857DSouWlCwFV2/DriveEase?node-id=0-1&p=f&t=FnllJoQqbtLgTHh3-0)

The design includes:
- Complete user interface mockups
- Interactive prototypes
- Design system and components
- Responsive layouts for all screen sizes
- Accessibility considerations

## ✨ Features

### 🔐 User Authentication
- Secure registration and login system
- OTP-based authentication for enhanced security
- Password hashing with SHA-256
- Session management with token-based authentication

### 📝 Licence Applications
- **Learner's Licence Application** - Apply for your learner's permit online
- **Driving Licence Application** - Complete driving licence application process
- Application tracking with unique reference numbers
- Document upload and verification

### 📅 Appointment Management
- Schedule RTO appointments online
- Real-time slot availability
- Appointment confirmation and reminders
- Reschedule and cancellation options

### 💳 Payment Integration
- Secure payment processing
- Payment history tracking
- Multiple payment methods support
- Transaction receipts and invoices

### 👤 User Dashboard
- Personal profile management
- Application status tracking
- Payment history
- Document management
- Settings and preferences

### 🤖 AI Chatbot
- Intelligent chatbot assistance
- Natural Language Processing (NLP)
- Context-aware responses
- 24/7 support availability

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SQL.js** - SQLite database in JavaScript
- **CORS** - Cross-origin resource sharing

### Database
- **SQLite** - Lightweight relational database
- Tables: users, applications, appointments, payments, sessions

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Dhananjay-Chapla/DriveEase.git
cd DriveEase
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start the backend server**
```bash
npm start
```
The server will run on `http://localhost:3000`

4. **Open the application**
- Open `index.html` in your browser, or
- Navigate to `http://localhost:3000` if serving through the backend

## 🚀 Usage

### For Users
1. **Register** - Create a new account with your mobile number
2. **Login** - Access your account using credentials or OTP
3. **Apply** - Submit learner's or driving licence applications
4. **Book Appointment** - Schedule your RTO visit
5. **Track** - Monitor your application status
6. **Pay** - Complete payments securely online

### For Developers
```javascript
// Example: API endpoint for user registration
POST /api/register
{
  "first_name": "John",
  "last_name": "Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "password": "securepassword"
}
```

## 📁 Project Structure

```
DriveEase/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── driveease.db        # SQLite database
│   ├── package.json        # Backend dependencies
│   └── node_modules/       # Node packages
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── portal.html             # User dashboard
├── learners-licence.html   # Learner's licence form
├── driving-licence.html    # Driving licence form
├── appointment-enhanced.html # Appointment booking
├── my-applications.html    # Application tracking
├── payment-history.html    # Payment records
├── profile.html            # User profile
├── settings.html           # User settings
├── chatbot-ui.js           # Chatbot interface
├── chatbot-nlp.js          # NLP processing
├── chatbot-knowledge.js    # Chatbot knowledge base
├── animations.css          # CSS animations
└── README.md               # Project documentation
```

## 🔒 Security Features

- Password hashing using SHA-256
- Token-based session management
- OTP verification for sensitive operations
- CORS protection
- SQL injection prevention
- Input validation and sanitization

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| POST | `/api/send-otp` | Send OTP to mobile |
| POST | `/api/verify-otp` | Verify OTP |
| POST | `/api/applications` | Submit application |
| GET | `/api/applications/:userId` | Get user applications |
| POST | `/api/appointments` | Book appointment |
| GET | `/api/appointments/:userId` | Get user appointments |
| POST | `/api/payments` | Process payment |
| GET | `/api/payments/:userId` | Get payment history |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhananjay Chapla**
- GitHub: [@Dhananjay-Chapla](https://github.com/Dhananjay-Chapla)
- Project Link: [https://github.com/Dhananjay-Chapla/DriveEase](https://github.com/Dhananjay-Chapla/DriveEase)

## 🙏 Acknowledgments

- Inspired by India's Digital India initiative
- Built for improving citizen services
- Designed with accessibility and usability in mind

## 📞 Support

For support, email support@driveease.com or raise an issue in the GitHub repository.

---

Made with ❤️ for Digital India
