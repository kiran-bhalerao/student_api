const createStudent = require('../operations/createStudent');
const readStudent = require('../operations/readStudent');
const updateStudent = require('../operations/updateStudent');
const deleteStudent = require('../operations/deleteStudent');

module.exports = (appRouter) => {
    appRouter.route('/')
        .get((req, res) => {
            res.render('home', { msg: 'Welcome to Student-API' });
        });

    // get students && get details from add form n save to db 
    appRouter.route('/students')
        .get((req, res) => {
            readStudent()
                .then((students) => {
                    res.render('list', { student: students });
                });
        })
        .post((req, res) => {
            let errors = [];
            if (!req.body.name) {
                errors.push({ text: 'Plz Enter Name' });
            } if (!req.body.age) {
                errors.push({ text: 'Plz Enter Age' });
            } if (!req.body.language) {
                errors.push({ text: 'Plz Enter Language' });
            }
            if (errors.length > 0) {
                if (errors.length == 3)
                    res.render('add', { errors: [{ text: 'Plz Enter All Information' }] });
                else
                    res.render('add', { errors });
            } else {
                // add to db from res.body and redirect to show list
                createStudent(req.body.name, req.body.age, req.body.language)
                    .then(() => {
                        res.redirect('/students');
                    });
            }
        });

    // add students form
    appRouter.route('/students/add')
        .get((req, res) => {
            // render ad form having POST method
            res.render('add');
        });

    // edit students form
    appRouter.route('/students/edit/:id')
        .get((req, res) => {
            // render edit form having PUT method by method-override
            // read info usign id n send object to edit form
            readStudent(req.params.id)
                .then((students) => {
                    res.render('edit', students[0]);
                });
        });


    //handle one students by id
    appRouter.route('/students/:id')
        .get((req, res) => {
            // res.send(req.params.id);
            readStudent(req.params.id)
                .then((students) => {
                    res.render('list', { student: students });
                });
        })
        .delete((req, res) => {
            // delete from db and redirect t0 show list
            deleteStudent(req.params.id)
                .then(() => {
                    res.redirect('/students');
                });
        })
        .put((req, res) => {
            let errors = [];
            if (!req.body.name) {
                errors.push({ text: 'Plz Enter Name' });
            } if (!req.body.age) {
                errors.push({ text: 'Plz Enter Age' });
            } if (!req.body.language) {
                errors.push({ text: 'Plz Enter Language' });
            }
            if (errors.length > 0) {
                if (errors.length == 3)
                    res.render('edit', { errors: [{ text: 'Plz Enter All Information' }] });
                else
                    res.render('edit', { errors });
            } else {
                // pdate to delete from db and redirect t0 show list

                updateStudent(req.params.id, req.body.name, req.body.age, req.body.language)
                    .then(() => {
                        res.redirect('/students');
                    });
            }
        });
};