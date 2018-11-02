var gulp = require("gulp");
var sass = require("gulp-sass");
var auto = require("gulp-autoprefixer");
var clean = require("gulp-clean-css");
var fs = require("fs");
var url = require("url");
var server = require("gulp-webserver");
var Json = require("./src/data/data.json");
var path = require("path")
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/styles"))
});
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
})
gulp.task("devServer", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090, //配置端口
            host: "169.254.146.225",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname
                if (pathname == "/api/list") {
                    res.end(JSON.stringify({ code: 0, data: Json }))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("dev", gulp.parallel("devSass", "watch"))