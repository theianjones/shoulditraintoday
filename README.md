[![Depfu](https://badges.depfu.com/badges/3510c0fc8a9b17a045ef2389a436fe9d/count.svg)](https://depfu.com/github/theianjones/shoulditraintoday?project_id=27149)

# ![](https://res.cloudinary.com/dpspogkzf/image/upload/v1618869726/shoulditrain/logo_wl1ezx.svg) shoulditrain.today

This project is based on a [quiz from a local (Northern VA, USA) nutrition company](https://www.instagram.com/p/CL7kiaqnP80/). Essentially, it is an 8 question quiz where the user must self-assess their answers. We then apply points to the answers that the user gives. At the end of the quiz, we perform a calculation and give a "% of readiness" for the user to expect from themselves.

This number is by no means definitive but after taking the quiz consistently you should see what a good baseline recovery is for yourself on any given day. This number will represent how ready you feel to train on that day

So here is an example of what a question would be:

How many days in a row have you trained?

The user would be prompted to select one of these answers:

- 4+ days
- 3 days
- 2 days
- 1 day
- Coming off a rest day

## Project Breakdown

There are two main parts to this app:

1. Capturing and storing user information
2. Displaying the history of user information

From a technical standpoint, this project demonstrates a few application state problems.

The form itself has quite a bit of state. There's user-entered information you have to keep track of. Along with that, there's user progress through a somewhat lengthy quiz that needs to be accounted for.

Along side the form state, we also need to store the answers in a database. This involves making asynchronous calls to a service and handling any errors that may happen while the user is in the middle of the quiz.

### Capturing and Storing Quiz Data

For this feature, there are 2 slices to the pie:

1. implementing the form
2. storing captured information

The process will be a multi-step form. Each page will have its own question. When the user enters the information and then clicks "next question" we will store that information in our backend.

The solution we choose will need to keep track of the progress of where the user is in the quiz. This is important so that if someone can't complete it in one sitting for whatever reason, they can come back to it later.

#### Technical Choices

A multi-step form introduces some state concerns that we need to handle. First we need to store the values that the user has entered, then we need to order each of the sub forms to present to the user.

We will be using [XState](https://xstate.js.org/) as a way to keep track of all the data associated with these forms.

XState is a good choice because it makes all of your state choices explicit. You have to have specified state transitions to create a functioning machine. The process of building a state machine gives you the confidence that you've accounted for all of the mays the user can interact with your application at one point it time.

For displaying the quizzes themselves, we will be storing them in a json file and loading them up in a react component. This gets use started with very little hassle. The quiz is not likely to change very often so the editing experience of the quiz isn't super important.

We are using [google firestore](https://firebase.google.com/) to store the data entered. A document store (nosql database) gives us the flexibility to store this quiz data however we see fit. We can adjust the model in the future with very little cost.

Here is the initial data model for our quiz answer:

```js
{
  createdAt: '2021-05-28'
  guid: '92db5f82-0390-40fc-b078-70e7594c8043'
  version: 0
  answers: [
    {
      guid: 'b6656926-f6af-4a95-b7aa-b695c53f610f'
      question: 'How many days in a row have you trained?',
      answer: '2 days'
      score: 3
    }
  ]
}
```

This will be the core piece of data for our app but its not the whole story. Firestore breaks things down into `collections` and `documents`. You'll notice a version field in the object. This gives us a way to change the quiz and know exactly which quiz they took. We give each quiz a guid so we can identify them if we ever want to add another quiz in the future.

We will have a top-level `users` collection. This collection will hold `user` documents. Each `user` document will look like this:

```js
{
  answers: [{
    createdAt: '2021-05-28'
    guid: '92db5f82-0390-40fc-b078-70e7594c8043'
    quizVersion: 0
    answers: [
      {
        question: 'How many days in a row have you trained?',
        answer: '2 days'
        score: 3
      }
    ]
  }]
}
```

Each `user` object will have an `answers` key that is an array of each quiz that they have taken. Its important to note that Firebase is taking care of authentication for us and isn't something I'm going to explain in detail with this project.

### Displaying the history of user information

TODO

## Build the project yourself

First, run the development server:

```bash
yarn dev
```

If you'd like serverless function support:

```bash
vercel dev
```

### Set up Firebase

#### Set up Firebase Application

This section will describe how to get the correct values for these variables found in `./src/utils/firebase/credentials.ts`

**You likely won't need to create a project**. Contact the team if you need access to the firebase datastore.

Create a Firebase project: click `add project` on [this page](https://console.firebase.google.com/u/0/).

Now you need to add an `App` to your project. You can choose from `iOs`, `Android`, `Web`, or `Unity`.

We want the web option. There will be a `</>` icon, click this and you will start the app creation flow.

1. Name the app whatever you want
   1. you dont need firebase hosting
2. Click register app

Now youll be presented with code that looks like this:

```html
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  var firebaseConfig = {
    apiKey: 'AIzaSyB6tKhpnB9baUxR8FVC90-gLbERVu_q-uo',
    authDomain: 'test-5398a.firebaseapp.com',
    projectId: 'test-5398a',
    storageBucket: 'test-5398a.appspot.com',
    messagingSenderId: '653030811583',
    appId: '1:653030811583:web:5931db3465d6125688e30a',
    measurementId: 'G-JJXDVMKM9W',
  }
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
</script>
```

Now you copy the `firebaseConfig` and past it into the object for `APP_CREDENTIALS`.

#### Firebase Admin SDK keys required for Authentication

In this section, we will be grabbing the correct keys for the Firebase Admin SDK. These keys are private so you will need to ask for the keys or generate them yourself.

These are the env variables we will fill:

```
FIREBASE_ADMIN_PRIVATE_KEY=firebase-admin-private-key
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-admin-client-email
COOKIE_SECRET_CURRENT=some-random-guid
COOKIE_SECRET_PREVIOUS=some-random-guid
```

First click the cog then "Project Settings" in the sidebar. Next navigate to the "Service Accounts" section.

Now, press "generate new private key" and a json file will be downloaded.

You will need the `private_key` and `client_email` fields in this json file.

Now you can fill out the values in `.env.local`:

```
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...some really long key...-----END PRIVATE KEY-----\n",
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-16nfh@test-5398a.iam.gserviceaccount.com
COOKIE_SECRET_CURRENT=some-random-guid
COOKIE_SECRET_PREVIOUS=some-random-guid
```

Restart the next server if it's running!

Now you're app can authenticate logged in users and post their quiz answers to firestore.

#### Firebase Authentication

1. Navigate to the "Authentication" tab
2. Click "Get Started"

Thats it 👀
