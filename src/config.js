export default {
    port: process.env.PORT || 4000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/rabit-DB',
    SECRET: process.env.SECRET_KEY || 'Bearer'
}