module.exports = function(app, shopData) {
    // Handle our routes

    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });
	//just show the searched message not the list of books 
 	//app.get('/search-result', function (req, res) {
        //searching in the database
     	//res.send("You searched for: " + req.query.keyword+ "%");

    app.get('/search-result', function(req, res) {
	let keyword =  req.query.keyword 
     	let sqlquery = "SELECT * FROM books WHERE name LIKE '%"+req.query.keyword.trim()+"%' "; 
	//console.log(sqlquery);

 // let sqlquery = "SELECT name, price FROM books WHERE name LIKE '%"+req.query.keyword+"%' "; // query database to get all the books

        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }

           // res.send(result);
                let newData = Object.assign(result);
		//console.log(result);
						//{}, shopData, {availableBooks:result});
              // console.log({newData:newData});
		 res.render("searchresults.ejs",{newData: newData});
		
         });
    });

    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);
    });
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                       
    });
    app.get('/addbook',function(req,res){
        res.render('addbook.ejs', shopData)
    });
//making the list
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
           // res.send(result);
		let newData = Object.assign({}, shopData, {availableBooks:result});
		console.log(newData)
		res.render("list.ejs", newData)
         });
    });

//adding the books
      app.post('/bookadded', function (req,res) {
          // saving data in database
          let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
          // execute sql query
          let newrecord = [req.body.name, req.body.price];
          db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
              return console.error(err.message);
            }
            else
            res.send(' This book is added to database, name: '+ req.body.name + ' price: '+ "£" + req.body.price);
            });
      });
//bargain
	app.get('/bargain', function(req, res) {
        let sqlquery = "SELECT * FROM books WHERE price < 20"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
           // res.send(result)
                let newData = Object.assign({}, shopData, {availableBooks:result});
                console.log(newData)
                res.render("bargainbooks.ejs", newData)
         });
    });
}
