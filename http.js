var express = require("express"),
    app = express();

var path = require("path");

const DIR = __dirname.replace(/\/server|\\server/, "");
const BUILD = path.join(DIR, "dist");

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(BUILD));

app.get('/*', function (req, res) {
    res.sendFile(path.join(BUILD, "index.html"));
});

console.log(BUILD);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});