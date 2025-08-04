const app = require('./app'); 
const { sequelize } = require('./config/database');

const PORT = 8080;

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database and tables synced");
        
        app.listen(PORT, () => {
            console.log(`API running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error syncing database:", error);
    });