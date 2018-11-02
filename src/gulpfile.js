var gulp = require("gulp")
var sass = require("gulp-sass")
var auto = require("gulp-autoprefixer")
var clean = require("gulp-clean-css")
gulp.task("devSass", function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest("./styles"))
});
gulp.task("watch", function() {
    return gulp.watch("./scss/*.scss", gulp.series("devSass"))
})
gulp.task("dev", gulp.parallel("devSass", "watch"))