var express = require('express');
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const conn = require('./db/conn');

// Routes
var movimentacoesRouter = require('./routes/movimentacoesRouter');
var transacoesRouter = require('./routes/transacoesRouter');
var authRouter = require('./routes/authRouter');

var app = express();

// view engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// script
app.use(
  '/transacoes/script',
  express.static(__dirname + '/public/script', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  }),
);

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now + 360000),
      httpOnly: true,
    },
  }),
);

// flash messages
app.use(flash());

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

app.use('/movimentacoes', movimentacoesRouter);
app.use('/transacoes', transacoesRouter);
app.use('/register', authRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
