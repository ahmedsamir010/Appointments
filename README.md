# 🗓️ Appointment Scheduling System (Frontend)

Frontend built with **Angular 19**, styled using **Tailwind CSS**, **PrimeNG**, and **FontAwesome**.  
This application connects to a **.NET RESTful API** to manage appointments, including features like filtering, pagination, and CRUD operations.

## 🔗 Live Demo (Swagger for API)

You can test the backend API here:  
[https://addappointment.runasp.net/swagger/index.html](https://addappointment.runasp.net/swagger/index.html)

## 🔥 Features

- ✅ View appointments with pagination  
- 🔍 Filter by status, date range, **customer name**, and **notes**  
- ➕ Create new appointments  
- ✏️ Edit existing appointments (only if status is `Scheduled`)  
- ❌ Cancel appointments  
- ⚡ Validations:
  - No past appointments  
  - No duplicate appointments for the same customer at the same time  

## 🧱 Tech Stack

- **Angular 19**  
- **Tailwind CSS**  
- **PrimeNG**  
- **FontAwesome**  
- **.NET RESTful API** (backend)  

## 📦 Installation & Run

1. Open **Visual Studio Code** or **any editor** you prefer.  
2. Clone the repository:
   ```bash
   git clone https://github.com/ahmedsamir010/Appointments.git
3. Install node modules
    .open terminal and write npm i
4. Run The Project as write
   ng s --o
