var gulp = require("gulp"),
    less = require("gulp-less"),
    nano = require("gulp-cssnano"),
    browserSync = require("browser-sync").create(),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require("gulp-sourcemaps");

gulp.task("html", function(){
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("img", function(){
    return gulp.src("src/images/*")
        .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task("css", function(){
    return gulp.src("src/css/main.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ["last 3 versions"],
            cascade: false
        }))
        .pipe(nano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("app-js", function(){
    return gulp.src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("app.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", ["build"], function(){
    browserSync.init({
        server: "dist"
    });
    gulp.watch("src/css/**/*.less", ["css"]);
    gulp.watch("src/js/**/*.js", ["app-js"]);
    gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("src/**/*.html").on("change", browserSync.reload);
    gulp.watch("src/images/*", ["img"]);
    gulp.watch("dist/images/*").on("change", browserSync.reload);
    gulp.watch("src/fonts/**/*", ["fonts"]);
    gulp.watch("dist/fonts/*").on("change", browserSync.reload);
});
gulp.task("build", ["html", "css", "app-js", "img", "fonts"]);
gulp.task("default", ["build", "watch"]);