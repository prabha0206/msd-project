# Environment Variables Setup Guide

## Backend (Render)

### Required Environment Variables for Backend
1. `MONGO_URI`: Your MongoDB connection string
   - Production value: Your MongoDB Atlas URI
   - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

2. `JWT_SECRET`: Secret key for JWT token generation
   - Production value: Generate a strong random string
   - Example: Use a secure random string generator

3. `PORT`: Application port (Render will provide its own)
   - Note: Render automatically sets this, you don't need to configure it

### Steps to Add Environment Variables in Render
1. Go to your Render dashboard
2. Select your backend service
3. Click on "Environment" tab
4. Add the following variables:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_jwt_secret
   ```
5. Click "Save Changes"
6. Redeploy your service to apply the changes

## Frontend (Vercel)

### Note About Frontend Environment Variables
The frontend is already configured to automatically use the correct API URL based on the environment:
- Development: `http://localhost:5000/api`
- Production: `https://msd-project-tmru.onrender.com/api`

No additional environment variables are needed in Vercel as we're handling the API URL through the `config/api.js` file.

### Optional: Override API URL in Vercel (if needed)
If you need to override the API URL in Vercel:
1. Go to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add:
   ```
   REACT_APP_API_URL=https://your-custom-api-url.com
   ```
4. Redeploy your frontend

## Security Notes
1. Never commit real environment variable values to Git
2. Use strong, random values for secrets
3. Regularly rotate JWT secrets
4. Ensure MongoDB connection string uses a user with minimum required permissions
5. Enable IP allowlist in MongoDB Atlas for additional security

## Testing Environment Variables
### Backend
Test your environment variables in Render:
```bash
curl https://msd-project-tmru.onrender.com/api/auth/test
```

### Frontend
Test API connection in browser console:
```javascript
fetch('https://msd-project-tmru.onrender.com/api/auth/test')
  .then(res => res.json())
  .then(console.log)
```