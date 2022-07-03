# Github App

## Description

App where you can search repositories and filter them by language and updated date. Also you can check your own repositories.

## Technology stack

- [React.js](https://reactjs.org/), [Next.js](https://nextjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/)

## Requirements

- ### General

  - **Yarn**

  This repository uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager.

- ### Frontend

  - **Github OAuth**
    Github is being used as an auth provider, you will need to [create an OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) app on your github account with these settings:

    ![](https://res.cloudinary.com/ivanms1/image/upload/v1644078662/Screen_Shot_2022-02-06_at_1.28.01_AM_aa0u5l.png)

  - **Enviroment Variables**

    ```
    GITHUB_CLIENT_ID="your oatuh github client id"
    GITHUB_CLIENT_SECRET="your oatuh github client secret"
    JWT_SECRET="some random string, only for development"
    NEXTAUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_SERVER_URL="http://localhost:8080/graphql"
    ```

## Running the app

- ### Frontend

  - Install dependencies

    ```
    yarn
    ```

  - Start the app

    ```
    yarn dev:web
    ```
