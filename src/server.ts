import app from './app'
import config from '../src/app/modules/config/index'
import mongoose from 'mongoose'



async function Bootstrap() {
    await mongoose.connect(`mongodb+srv://${config.db_name}:${config.db_password}@cluster0.bnhb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
      })
}

Bootstrap()