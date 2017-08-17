const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
const notify 	= require("gulp-notify");
const connect	= require("gulp-connect");
const del		= require("del");
const minifyCSS	= require("gulp-mini-css");

//*-----------------------*\
// Monitorar estes arquivos
//*-----------------------*/
var arquivos = ['index.html','css/style.css'];


//*-----------------------*\
// Limpa a pasta CSS e executa o procedimento.
//*-----------------------*/
gulp.task("sass", ['apagar'], function(){
	return gulp.src(['./scss/style.scss'])
				.pipe(sass())
				.on("error", notify.onError({title:"Erro ao compilar", message:"<%= error.message %>"}))
//				.pipe(minifyCSS())
				.pipe(gulp.dest("./css"))
});

//*-----------------------*\
// Monitorando os Arquivos definidos
//*-----------------------*/
gulp.task('monitorando', function(){
	gulp.src(arquivos)
	.pipe(connect.reload())
});

//*-----------------------*\
// Limpeza da pasta CSS
//*-----------------------*/
gulp.task('apagar',function(){
	del(['css/*.css']);
});

//*-----------------------*\
// 	WATCH
//*-----------------------*/

gulp.task("watch", function(){
	gulp.watch("./scss/**/*.scss", ['sass']);
	gulp.watch(arquivos, ['monitorando']);
});


//*-----------------------*\
// CRIANDO SERVIDOR: localhost:8181
//*-----------------------*/
gulp.task('connect', function(){
	connect.server({	livereload: true, port: 8181 });
});


//*-----------------------*\
// DEFAULT.
//*-----------------------*/
gulp.task("default",['sass', 'connect', 'watch']);