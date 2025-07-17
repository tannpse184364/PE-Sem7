# Run command line

```bash

npx express-generator <app-name>

npm install bcrypt cors dotenv ejs express-session jsonwebtoken mongoose nodemon method-override
```

# TODO

Tạo .env ở baseDir
[Go to file](./.env)

add:

```js
MONGO_URI=mongodb://127.0.0.1:27017/<DB name>
PORT=3000
JWT_SECRET=<JWT KEY>
```

[Go to file](./package.json#L5)
-> add scipt: "run dev": "nodemon ./bin/www"

[Go to file](./app.js)

--> Add:

```js
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const connect = mongoose.connect(uri);
connect.then((db) => {
  console.log("Connect ok!");
});
```

=============================================

# Create models

=============================================

```js
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const modelSchema = new schema(
  {
    sectionName: { type: String, required: true },
    sectionDescription: { type: String, required: true },
    duration: { type: Number, required: true },
    isMainTask: { type: Boolean, default: false },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Bỏ s ở cuối nếu có
      require: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Model", modelSchema);
module.exports = Model;
```

---

[Go to file](./app.js)

add

```js
const model = require("./models/model");
```

=============================================

# Authenticate

=============================================

<!-- Check lại Model và field -> replace theo đề -->

[Go to file](./controllers/client-rendering/auth.js)

[Go to file](./middlewares/auth.js#L2)
[Go to file](./middlewares/auth.js#L14)

=============================================

# Tạo Model Controller

=============================================

<!-- Check lại Model và field -> replace theo đề -->

[Go to file](./controllers/client-rendering/course.js)

=============================================

### Nếu làm ejs

=============================================

```js

-> Replace: app.set("view engine", "jade"); = app.set("view engine", "ejs");

-> Add:
app.use(methodOverride("_method"));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
```

---
