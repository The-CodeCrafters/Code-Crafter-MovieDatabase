// server.js (or your main server file)
import configP from './config.server.js';
 
const PORT = configP.port;
 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
