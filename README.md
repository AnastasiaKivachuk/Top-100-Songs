This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It connects with [Firebase](https://firebase.google.com/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing, [SCSS](https://sass-scss.ru/) for styling, [Material-UI](https://mui.com/material-ui/getting-started/overview/) for components.

Project has a couple of pages:
- home page (with table of popular songs)
- song detail page (with information about song)
- profile page (with form to update profile)
- sign-in page (with authorization form)
- sign-up page (with form of creating new user)
- restore-password page (with form of restore password)

## Commands

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run tests:

```bash
yarn test
```

Run coverage tests:

```bash
yarn test:coverage
```

Run lint:

```bash
yarn lint
```

Run lint fix:

```bash
yarn eslint:fix
```

Run stylelint:

```bash
yarn stylelint
```

Run stylelint fix:

```bash
yarn stylelint:fix
```

Install husky:

```bash
yarn prepare
```

Run audit:

```bash
yarn audit
```

## Deploy on Heroku

This app was deployed on the [Heroku](https://www.heroku.com/): [top-songs](https://top-songs-app.herokuapp.com/).