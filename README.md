# Simple Color Game

This is a browser game made using VueJS + Ionic on front-end, and AdonisJS + PostgreSQL on back-end.

The game is very simple: You have to click on the colors that appear on the center of the screen before the time runs up. Remember: click on the **color**, not the word.

[Click here to play the game!](https://simple-color-game.herokuapp.com/)

## How to install the project locally

Firstly, clone the repository into your computer:

```shell
git clone https://github.com/ThalesQwerty/simple-color-game "Simple Color Game"
```

After that, install the dependencies:

```shell
cd "Simple Color Game"
npm install
```

Intall Adonis on your computer by running:
```shell
npm i -g @adonisjs/cli
```

Create a file named `.env` on the project root directory, and copy the content from `.env.example` into it.

Generate an app key using `adonis key:generate`.

### Setting up the database

In order for the highscores to work, you'll have to install **PostgreSQL** in your computer. I've linked a few short tutorials for that, depending on your OS:

- [Windows](https://www.postgresqltutorial.com/install-postgresql/)
- [Linux](https://www.postgresqltutorial.com/install-postgresql-macos/)
- [Mac OS](https://www.postgresqltutorial.com/install-postgresql-linux/)

**NOTE:** Write the password that you chose for the postgres account into the `.env` file, right after `DB_PASSWORD=`.

After installing PostgreSQL, create a new database named `simple_color_game`.

Then, run the following command on the project root. This will create the tables on the database:
```shell
ace migration:run
```

### Running the project

Now, you can finally run the project. Firstly, you'll need to start the back-end:
```shell
npm start
```

After that, open a new terminal window and, on the project root, also start the front-end:
```shell
npm run serve
```

Finally, open `localhost:3334` on your browser to see the project working locally.
