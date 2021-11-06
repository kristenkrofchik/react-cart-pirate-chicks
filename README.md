# Pirate Chicks Vintage

[Pirate Chicks Vintage](https://react-pirate-chicks.herokuapp.com/)

Pirate Chicks Vintage is an ecommerce website for the vintage and antique shop I own and operate with my mom. Our shop has a large variety of products, but we specialize in colelctibles and home decor items from the 1920's to 1990's. This website was made with PostgreSQL, Node.js, Express, React and Stripe Payments. The website will list our available products and allow users to shop by adding items to their shopping cart and purchasing them. 

### User Flow

A user will enter the site via the homepage. From there, they will use a navigation bar to view the shop's product inventory, which is stored on the backend in a PostgreSQL database. In a later version, the user will be able to view the products by a variety of criteria, including date added, price, name and category. In a later version, the user will also be able to register and login to the website for greter ease of shopping. The user interface on the frontend was created with React. The React code makes calls to the website's API on the Node.js backend to display the products and other relevant information. 

A user can choose products to add to their shopping cart. When they are finished shopping, a user can purchase the items in their cart. The checkout session and payment is handled via Stripe, and the React app is connected to Stripe via the Stripe API. When a product is successfully purchased, its quantity will be reduced in the PostgreSQL database.

### Status
This project is still in development, but the current version is a workable website that uses Stripe's test mode to make test purchases. Future versions of the project will include more functionality including user signup and login, a contact form and a newsletter signup. Future versions will also allow for real purchases. 

### Installation

#### Backend

1. Fork repository
2. Clone repository to local environment
3. Run npm install to install dependencies:

```bash
$ npm install
```

4. Create and seed PostgreSQL database (you will need to have PostgreSQL installed on your machine to do this):

```bash
$ psql < piratechicks.sql
```

6. Run npm start to start the application:

```bash
$ npm start
```
#### Frontend

1. Open new terminal
2. Cd into the frontend directory

```bash
$ cd frontend
```
3. Run npm install to install dependencies:

```bash
$ npm install
```
4. Run npm start to start the application:

```bash
$ npm start
```

### Technologies
[Node.js](https://nodejs.org/en/docs/)

[Express](https://expressjs.com/)

[React](https://reactjs.org/docs/getting-started.html)

[Create React App](https://create-react-app.dev/docs/getting-started/)

[PostgreSQL](https://www.postgresql.org/docs/)

[Axios](https://axios-http.com/docs/intro)

[Stripe](https://stripe.com/docs/api)


### Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.

### License
Kristen Krofchik
