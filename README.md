Rideshare Assistant
===================

Overview
--------
Rideshare Assistant is a lightweight decision-support web app designed to help rideshare drivers make smarter airport and positioning decisions.

The current MVP focuses on:
- Airport queue evaluation
- Estimated hourly earnings
- Vehicle type impact
- Traffic considerations
- Nearby event/cruise demand
- Zone awareness around Houston-area airports

The app is intended to reduce wasted driving time and improve driver profitability by helping determine whether to:
- GO
- WAIT
- AVOID

Features
--------
- Mobile-friendly interface
- Rule-based scoring engine
- Vehicle type support:
  - Uber X
  - Comfort / Premier
  - Uber XL
- Airport wait-time analysis
- Traffic-level analysis
- Cruise and event demand logic
- Current zone positioning logic
- Estimated hourly earnings output
- Recommendation explanation engine

Project Structure
-----------------
airport-decision-assistant.html
    Main application UI

styles.css
    Application styling and responsive layout

app.js
    DOM interaction, rendering, and button logic

scoring-model.js
    Core scoring and recommendation engine

Current Status
--------------
This project is currently an MVP (Minimum Viable Product).

The application:
- runs locally in the browser
- uses no APIs yet
- uses no backend/database yet
- uses no user authentication yet

Future Ideas
------------
Potential future upgrades:
- Real airport queue APIs
- Live traffic integration
- GPS/location awareness
- Driver earnings tracking
- Local storage for settings
- PWA/mobile install support
- Surge tracking
- Driver profile customization
- Cloud deployment
- Subscription model

Goals
-----
The goal of this project is to create a practical tool that helps rideshare drivers:
- reduce dead miles
- avoid low-value airport queues
- improve hourly earnings
- make more data-driven decisions

Author
------
Kevin Dixon
GitHub: marketwithkevin-netizen

Repository
----------
rideshare-assistant

License
-------
Private project - all rights reserved.
