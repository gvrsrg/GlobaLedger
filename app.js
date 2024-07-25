const express = require('express');
const session = require('express-session');
const cors = require('cors')
const bcrypt = require('bcrypt');
const { currencies } = require('./config/currencies.js')
const { userRouter } = require('./routes/userRouter.js')
const { accountRouter } = require('./routes/accountRouter.js');
const { categoryRouter } = require('./routes/categoryRouter.js');

const { _createUser, _getUserByEmail } = require('./models/userModel.js');
const { _getAllUserCategories } = require('./models/categoryModel.js');
const { _getAllUserAccounts } = require('./models/accountModel.js');

const app = express()
const secret = process.env.SESSION_SECRET;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: 24 * 3600 * 1000
}));

app.use(express.urlencoded({extended: true})) // to parse urlencoded data
app.use(express.json()) // to parse json data
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});
app.get('/', (req, res) => {
    let user = req.session.user;
    res.render('index', {loggedIn: !!user, user})
});

app.get('/settings', async (req, res) => {
    let user = req.session.user;
    console.log('user: ', user)
    if(user){
        const userAccounts = await  _getAllUserAccounts({userid: user.userid, email: user.email});
        const userCategories = await _getAllUserCategories({userid: user.userid, email: user.email});
        res.render('settings', {loggedIn: !!user, user, accounts: userAccounts, categories: userCategories, incomes: [], recurringExpenses: [], currencies});
    } else res.redirect('/');
})

app.use(cors())


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})

app.use('/api/users', userRouter)
app.use('/api/accounts', accountRouter)
app.use('/api/cat', categoryRouter)

//Signup/Login/Logout authentication logic:

app.get('/signup', (req, res) => {
    res.render('signup', {login: false})
})
app.get('/login', (req, res) => {
    res.render('signup', {login: true})
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password'); // Debug log
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await _getUserByEmail(email);
        if (user && user.password) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await _createUser({ email, password: hashedPassword, firstname, lastname });
        console.log('New user:', user);
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});