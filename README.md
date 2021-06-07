# Sales Sheet - Daily Sales Tracker

  > Sales Sheet is a PWA solution to monitor the cash flow of any small to medium scale business.

## Why building this project ? 
  > Sales Sheet's goal is to reduce time spent manually on counting and cross checking money(cash).

## Tech Stack

**Client:** React, TailwindCSS & Service workers.

**Server:** Node, Express & node-postgres.

**Deployment:** AWS EC2

## Features

    What will the user be able to do after the solution is shipped? 

#### Users :

- Users should login to make a sales entry.
- Users will have a profile section where their personal details can be viewed and will have the option to edit the profile.
- By default, once a user is authenticated they can view a list of sales made on current day.
- User can add a new sales entry.

#### Admin User :

- Admin user can view/monitor the sales for every minute based on the business.
- Admin user can analyse the sales by filtering the sales done based on date.
- Admin user can filter the maximum sales made by a customer.


## Structure

**/src**

* Contains the root container for App and folders for sub components.

    - **/Components:**
        * Contains all React component code. Subfolder for each major component.
    
    - **/services:**
        * api.js: Abstracts all API calls into function calls.

## Run Locally

Clone the project

```bash
  git clone https://github.com/rohit1101/Sales-Sheet-Frontend.git
```

Go to the project directory

```bash
  cd Sales-Sheet-Frontend
```

Install dependencies

```bash
  yarn 
```

Run the application locally http://localhost:3000

```bash
  yarn start
```

Build (Will generate the build folder)

```bash
  yarn build
```
## Feedback

If you have any feedback, please reach out to me at srohit1101@gmail.com

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
