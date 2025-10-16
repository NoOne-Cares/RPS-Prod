import server from './server'
import ConnetDB from './db'


// server.listen(process.env.PORT || 8000, () => {
//     console.log("UP AND RUNNING ON PORT :" + process.env.PORT)
// })
ConnetDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("UP AND RUNNING ON PORT :" + process.env.PORT)
        })
    })
    .catch((err) => {
        console.log("fail to connect db :" + err)
    })

