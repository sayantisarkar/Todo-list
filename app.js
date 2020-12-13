const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const date = require(__dirname+"/date.js");

let app = express(); //ler, var or const all works in this project

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//Different data based on logic while most page content is same - use templates
app.set("view engine", "ejs");

const items = ["Buy","cook","eat"];
const workItems =[];

app.get("/", function(req, res) {
  // res.write()  //Single line adding and sending
  // res.sendFile() //Entire html redirecting
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //    day = "Monday";
  //    break;
  //   case 2:
  //    day = "Tuesday";
  //    break;
  //   case 3:
  //    day = "Wednesday";
  //    break;
  //   case 4:
  //    day = "Thursday";
  //    break;
  //   case 5:
  //    day = "Friday";
  //    break;
  //   case 6:
  //    day = "Saturday";
  //    break;
  //   default:
  //    console.log("Error");
  // }

  // if (currentDay === 6 || currentDay == 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }

  const day = date.getDay();
  res.render("list", {
    listTitle: day, ListItems:items
  });
  //res.sendFile(__dirname+"/app.html");
});

app.post("/", function(req, res){
  console.log(req.body);
  const listType = req.body.button;
  if(listType === "Work"){
    var item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
  }else{
     var item = req.body.item;
     items.push(item);
     res.redirect("/");
  }
  //console.log(req.body.item);
  //res.render("list", {ListItem:item});
})

app.get("/work",function(req,res){
  res.render("list",{listTitle: "Work List", ListItems: workItems})
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
