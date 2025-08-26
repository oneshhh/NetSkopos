
# NetSkopos - Security Information and Event Management (SIEM)

NetSkopos is a lightweight, modular Security Information and Event Management (SIEM) designed for monitoring and visualizing suspicious activities across a network or endpoint. Built using Python, Flask, and modern JavaScript, it provides a real-time web dashboard for tracking critical events like unauthorised file access, network spikes, brute force attempts, and user activity.

>  **Disclaimer:** This system is a proof-of-concept built for academic and demonstration purposes. All alerts generated are **simulated**. The backend API has been intentionally modified to provide **fake but realistic** data samples, and it does not analyze actual live traffic or system logs. This project should **not** be used in production environments.

---

##  Features

- **Live Alerts**: Simulated detection of anomalies (e.g., brute force logins, potential DDoS).
- **Network Traffic Monitoring**: Fake network activity logs updated in real-time.
- **File Access Logs**: Simulated logs of file read/write actions.
- **User Session Tracking**: Fake data showing active and past system logins.
- **Critical Alerts Panel**: Highlights high-priority simulated threats.
- **Interactive Web Dashboard**: Real-time charts, tables, and event feeds.
- **Email Notification System** *(optional)*: Sends alerts to security team inbox (simulation-ready).

---

##  Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Chart.js, Bootstrap
- **Backend**: Python, Flask
- **Data Simulation**: Custom Python logic for generating synthetic events
- **Deployment Ready**: Can be containerized or hosted locally using `ngrok` or `localhost`

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/netskopos-SIEM.git
cd netskopos-SIEM
```

### 2. Set Up the Environment

Make sure you have Python 3.7+ installed. Then install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Run the Flask Server

```bash
python app.py
```

> Optionally, you can expose your local server with tools like **ngrok**.

---

##  Project Structure

```
NetSkopos/
│
├── app.py                      # Flask backend with simulated APIs
├── static/
│   └── js/                     # JavaScript for charts and alerts
│   └── css/                    # Stylesheets
├── templates/
│   └── index.html              # Main dashboard UI
├── utils/
│   └── fake_data_generator.py # Simulates alert and log data
├── requirements.txt
└── README.md
```

---

##  Simulated Behavior

All log data and alerts are generated randomly using Python scripts to resemble real-world SIEM logs. These include:

- **Brute Force Attempts**
- **DDoS Traffic Spikes**
- **Unusual File Access**
- **Login Session Abnormalities**

No real-time network monitoring or log parsing is performed.

---

## Email Alert Integration (Optional)

An optional module allows for sending email notifications when critical simulated alerts are triggered. To enable:

1. Configure SMTP credentials in `email_config.py`.
2. Set `EMAIL_ENABLED = True` in your config.
3. Run the app and trigger simulated critical alerts.

---

## Future Improvements

- Real-time log parsing using tools like `Syslog`, `AuditD`, or `OSSEC`
- Integration with SIEM platforms (e.g., Splunk, ELK)
- Admin authentication for dashboard access
- Historical data storage using SQLite or MongoDB

---


---

## Disclaimer

This SIEM is built for **educational and demonstration purposes only**. The system simulates network and security behavior to illustrate how SIEM mechanisms work. It **does not** monitor or protect real systems from threats and should **not** be used as a replacement for production-grade cybersecurity solutions.

---

## Author

**Vansh Sabharwal**  
Email: [vanshsabharwal29@gmail.com]  
GitHub: [@oneshh](https://github.com/oneshh)
