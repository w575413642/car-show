// 引入 gulp及组件
var gulp    = require('gulp'),                 
    imagemin = require('gulp-imagemin'),       
    sass = require('gulp-ruby-sass'),          
    minifycss = require('gulp-minify-css'),    
    jshint = require('gulp-jshint'), 
    htmlmin = require('gulp-htmlmin')          
    uglify  = require('gulp-uglify'),          
    rename = require('gulp-rename'),           
    concat  = require('gulp-concat'),          
    clean = require('gulp-clean'),             
    tinylr = require('tiny-lr'),               
    server = tinylr(),
    obfuscate = require('gulp-obfuscate'),
    obfuscate = require('gulp-obfuscate'),
    port = 8288,
    // 启动热刷新
    connect = require('gulp-connect');
     
    gulp.task('connect', function() {
      connect.server();
    });
     
    gulp.task('default', ['connect']);
    // git
    var git = require('gulp-git');
    gulp.task('init', function(){
    git.init(function (err) {
    if (err) throw err;
      });
    });

    // Run git init with options
    gulp.task('init', function(){
      git.init({args: '--quiet --bare'}, function (err) {
        if (err) throw err;
      });
    });

    // Run git add
    // src is the file(s) to add (or ./*)
    gulp.task('add', function(){
      return gulp.src('./*')
        .pipe(git.add());
    });

    // Run git add with options
    gulp.task('add', function(){
      return gulp.src('./*')
        .pipe(git.add({args: '-f -i -p'}));
    });

    // Run git commit
    // src are the files to commit (or ./*)
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit('initial commit'));
    });

    // Run git commit with options
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit('initial commit', {args: '-A --amend -s'}));
    });

    // Run git commit without checking for a message using raw arguments
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit(undefined, {
          args: '-m "initial commit"',
          disableMessageRequirement: true
        }));
    });

    // Run git commit without appending a path to the commits
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit('initial commit', {
          disableAppendPaths: true
        }));
    });

    // Run git commit, passing multiple messages as if calling
    // git commit -m "initial commit" -m "additional message"
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit(['initial commit', 'additional message']));
    });

    // Run git commit, emiting 'data' event during progress
    // This is useful when you have long running githooks
    // and want to show progress to your users on screen
    gulp.task('commit', function(){
      return gulp.src('./*')
        .pipe(git.commit('initial commit', {emitData:true}))
        .on('data',function(data) {
          console.log(data);
        });
    });

    // Run git remote add
    // remote is the remote repo
    // repo is the https url of the repo
    gulp.task('addremote', function(){
      git.addRemote('origin', 'git@github.com:w575413642/test.public.git', function (err) {
        if (err) throw err;
      });
    });

    // Run git remote remove
    // remote is the remote repo
    gulp.task('removeremote', function(){
      git.removeRemote('origin', function (err) {
        if (err) throw err;
      });
    });

    // Run git push
    // remote is the remote repo
    // branch is the remote branch to push to
    gulp.task('push', function(){
      git.push('origin', 'master', function (err) {
        if (err) throw err;
      });
    });

    // Run git push
    // branch is the current branch & remote branch to push to
    gulp.task('push', function(){
      git.push('origin', function (err) {
        if (err) throw err;
      });
    });

    // Run git push with options
    // branch is the remote branch to push to
    gulp.task('push', function(){
      git.push('origin', 'master', {args: " -f"}, function (err) {
        if (err) throw err;
      });
    });

    // Run git push with multiple branches and tags
    gulp.task('push', function(){
      git.push('origin', ['master', 'develop'], {args: " --tags"}, function (err) {
        if (err) throw err;
      });
    });

    // Run git pull
    // remote is the remote repo
    // branch is the remote branch to pull from
    gulp.task('pull', function(){
      git.pull('origin', 'master', {args: '--rebase'}, function (err) {
        if (err) throw err;
      });
    });

    // Run git pull from multiple branches
    gulp.task('pull', function(){
      git.pull('origin', ['master', 'develop'], function (err) {
        if (err) throw err;
      });
    });

    // Run git fetch
    // Fetch refs from all remotes
    gulp.task('fetch', function(){
      git.fetch('', '', {args: '--all'}, function (err) {
        if (err) throw err;
      });
    });

    // Run git fetch
    // Fetch refs from origin
    gulp.task('fetch', function(){
      git.fetch('origin', '', function (err) {
        if (err) throw err;
      });
    });

    // Clone a remote repo
    gulp.task('clone', function(){
      git.clone('https://github.com/stevelacy/gulp-git', function (err) {
        if (err) throw err;
      });
    });

    // Clone remote repo to sub folder ($CWD/sub/folder/git-test)
    gulp.task('clonesub', function() {
      git.clone('https://github.com/stevelacy/git-test', {args: './sub/folder'}, function(err) {
        // handle err
      });
    });

    // Tag the repo with a version
    gulp.task('tag', function(){
      git.tag('v1.1.1', 'Version message', function (err) {
        if (err) throw err;
      });
    });

    // Tag the repo with a version and empty message
    gulp.task('tag', function(){
      git.tag('v1.1.1', '', function (err) {
        if (err) throw err;
      });
    });

    // Tag the repo With signed key
    gulp.task('tagsec', function(){
      git.tag('v1.1.1', 'Version message with signed key', {signed: true}, function (err) {
        if (err) throw err;
      });
    });

    // Create a git branch
    gulp.task('branch', function(){
      git.branch('newBranch', function (err) {
        if (err) throw err;
      });
    });

    // Checkout a git branch
    gulp.task('checkout', function(){
      git.checkout('branchName', function (err) {
        if (err) throw err;
      });
    });

    // Create and switch to a git branch
    gulp.task('checkout', function(){
      git.checkout('branchName', {args:'-b'}, function (err) {
        if (err) throw err;
      });
    });

    // Merge branches to master
    gulp.task('merge', function(){
      git.merge('branchName', function (err) {
        if (err) throw err;
      });
    });

    // Reset a commit
    gulp.task('reset', function(){
      git.reset('SHA', function (err) {
        if (err) throw err;
      });
    });

    // Show the formatted git diff
    gulp.task('diff', function(){
      gulp.src('./*')
        .pipe(git.diff('master', {log: true}))
        .pipe(gulp.dest('./diff.out'));
    });

    // Git rm a file or folder
    gulp.task('rm', function(){
      return gulp.src('./gruntfile.js')
        .pipe(git.rm());
    });

    gulp.task('addSubmodule', function(){
      git.addSubmodule('https://github.com/stevelacy/git-test', 'git-test', { args: '-b master'});
    });

    gulp.task('updateSubmodules', function(){
      git.updateSubmodule({ args: '--init' });
    });

    // Working tree status
    gulp.task('status', function(){
      git.status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
      });
    });

    // Other actions that do not require a Vinyl
    gulp.task('log', function(){
      git.exec({args : 'log --follow index.js'}, function (err, stdout) {
        if (err) throw err;
      });
    });

    // Git clean files
    gulp.task('clean', function() {
      git.clean({ args: '-f' }, function (err) {
        if(err) throw err;
      });
    });

    // Run gulp's default task
    gulp.task('default',['add']);
    // Svn
    // var svn  = require('gulp-asvn');
    // var svnConf = {
    //     svnDir :'./origin',
    //     destDir : './program',
    // }
    // gulp.task('checkout', function() {
    //         return svn.checkout (svnConf.svnDir, function(err){
    //                 if(err) throw err;
    //     });
    // });
    // gulp.task('add', function() {
    //         return svn.add (svnConf.svnDir, function(err){
    //                 if(err) throw err;
    //     });
    // });
    // gulp.task('export', function() {
    //         return svn.export(svnConf.svnDir, svnConf.destDir, function(err){
    //                 if(err) throw err;
    //     });
    // });
    // gulp.task('commit', function() {
    //         return svn.commit (svnConf.svnDir, function(err){
    //                 if(err) throw err;
    //     });
    // });
    // 各项打包
    gulp.task('html', function() {
           var options = {
                // removeComments: true,//清除HTML注释
                // collapseWhitespace: true,//压缩HTML
                collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            },
            htmlSrc = ['./origin/*.html','./origin/footer/*.html'],
            htmlDst = './program/';
            gulp.src(htmlSrc)
            .pipe(htmlmin(options))
            .pipe(gulp.dest(htmlDst));
    });

    // 不能用 ugJs
    gulp.task('ugjs', function () {
        return gulp.src('./program/script/*.js')
            .pipe(obfuscate())
            .pipe(gulp.dest('./program/script/'));
    });
    gulp.task('css', function () {
        var cssSrc = ['./origin/css/*.css','./origin/footer/css/*.css'],
            cssDst = './program/css';
            gulp.src(cssSrc)
            .pipe(minifycss())
            .pipe(gulp.dest(cssDst));
    });
    gulp.task('images', function(){
        var imgSrc = ['./origin/images/*','./origin/images/**/*','./origin/footer/images/**/*'],
            imgDst = './program/images';
            gulp.src(imgSrc)
            // .pipe(imagemin())
            .pipe(gulp.dest(imgDst));
    })
    function classIfication(Or){
        gulp.task('js', function () {
            var jsSrc = ['./origin/script/*.js','./origin/footer/script/*.js'],
                jsDst ='./program/script',
                ohter = ['./origin/script/jquery-1.10.1.min.js','./origin/script/laydate.js']
                gulp.src(jsSrc)
                // .pipe(concat('index.js'))
                // .pipe(gulp.dest(jsDst))
                // .pipe(rename({ suffix: '.min' }))
                // .pipe(obfuscate());
                .pipe(uglify().on('error', function(err){
                    console.log(`return an error X ---- > ${err}`);
                    this.emit('end');
                }))
                .pipe(gulp.dest(jsDst));
                if(Or){return;}
                other(ohter,jsDst);
        });
        // run-js
        gulp.start('js');
    }

    function other(jQ_other,jQ_target){
        var num = 0;
             gulp.src('./origin/**/*.*').on('data',function(file){
                console.log(file)
                console.log('look changes file ---->')
                console.log(file.history[0])
                num++;
             });
       setTimeout(function(){
         console.log(`In the final, the step setting unable uglify file`)
         console.log(`  ----> address ----> ${jQ_other}`)
         console.log(`  ----> changes file ----> ${num}`)
        gulp.src(jQ_other).pipe(gulp.dest(jQ_target))
    },5000)
    };
    // 清空program
    gulp.task('clean', function() {
        gulp.src(['./program/css', './program/script', './program/images'], {read: false})
            .pipe(clean());
    });
     // 清除重构
    gulp.task('default',function(){
        // console.log(gulp)
        gulp.start('html');
        classIfication(true);
        gulp.start('css');
        gulp.start('images');
    });
    // 清除重构
    gulp.task('pack',function(){
        gulp.start('html');
        classIfication(false)
        gulp.start('css');
        gulp.start('images');
    });
    // 压缩图片手动运行 时间太TM长了！
    gulp.task('bitch_img',function(){
        gulp.start('images');
    })
    // 运行监听
    gulp.task('watch',function(){

        server.listen(port, function(err){
            if (err) {
                return console.log(err);
            }
            gulp.watch('./origin/*.html', function(event){
                gulp.run('html');
            })

            gulp.watch('./origin/css/*.css', function(){
                gulp.run('css');
            });

            gulp.watch('./origin/script/*.js', function(){
                classIfication(true);
            });
            // 只复制不压缩
            gulp.watch(['./origin/images/**/*.{png,jpg,gif}','./origin/images/*.{png,jpg,gif}'], function(){
                gulp.run('images');
            });
            gulp.watch('./origin/images/*', function(){
                gulp.run('images');
            });
        });
    });