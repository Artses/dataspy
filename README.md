# DataSpy - Database Monitoring System

A Node.js-based application for monitoring databases, built with Express.js and featuring a web frontend.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Artses/dataspy.git
   cd dataspy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `env_exemple` to `.env`
   - Configure your database connection and other settings in `.env`

## Running the Application

Start the server:
```
npm start
```
or
```
node app.js
```

The application will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Maintenance

- **Dependencies**: Regularly update packages with `npm update` and check for security vulnerabilities using `npm audit`.
- **Database**: Ensure your database is running and accessible. Update connection strings in `.env` if needed.
- **Environment**: Monitor environment variables and logs for any configuration issues.
- **Frontend Assets**: Update static files in `frontend/` as needed for UI changes.