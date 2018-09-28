const readStudent = require('../operations/readStudent');

module.exports = (appRouter)=>{
    appRouter.route('/api/students')
    .get((req, res) => {
        readStudent()
            .then((students) => {
                res.send(students);
            });
    })
};