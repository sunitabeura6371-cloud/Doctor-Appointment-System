# Doctor Appointment Management System

A full-stack MERN web application for managing doctor appointments digitally.

## Project Description

The Doctor Appointment Management System allows patients to register, login, view doctors, and book appointments. Doctors can view and manage their appointments, while administrators can manage patients, doctors, and appointments.

## Features

### Patient
- Patient registration and login
- View available doctors
- Book appointments
- View appointments and appointment status
- Logout

### Doctor
- Doctor registration and login
- View patient appointments
- Confirm or cancel appointments
- Logout

### Administrator
- Admin registration and login
- View patients
- View doctors
- View all appointments
- Logout

## Technologies Used

### Frontend
- React.js
- Axios
- React Router DOM
- HTML
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt.js
- CORS

## Project Structure

```text
Doctor-Appointment-System/
├── backend/
│   ├── Routes/
│   ├── models/
│   ├── Server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md