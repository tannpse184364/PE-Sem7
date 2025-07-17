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

### Ejs

=============================================

```js

-> Replace: app.set("view engine", "jade"); = app.set("view engine", "ejs");

-> Add:
const methodOverride = require("method-override");
const session = require("express-session");

*** add before routes ***
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

**_Add Bootstrap and icon <link> at header_**

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

**_Add Bootstrap <script> at last_**

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

<!-- TABLE -->

**_html_**
[Go to file](./views/section.ejs#L19)

 <!-- CONFIRM DELETE MODAL -->

**_html_**
[Go to file](./views/section.ejs#L82)

**_script_**
[Go to file](./views/section.ejs#L167)

 <!-- ADD/EDIT MODAL -->

**_html_**
[Go to file](./views/section.ejs#L108)
**_script_**
[Go to file](./views/section.ejs#L185)
