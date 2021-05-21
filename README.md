[![Depfu](https://badges.depfu.com/badges/0eb0914942401daa2b5b7022cfcba170/count.svg)](https://depfu.com/github/joelhooks/next-typescript-tailwind-mdx-starter?project_id=17632)

This is an opinonated Next.js starter project that makes it relatively simple to spin up a new project.

## Getting Started

First, run the development server:

```bash
yarn dev
```

If you'd like serverless function support:

```bash
vercel dev
```

I'm personally in the "just do Next.js the Vercel way because it gives me modern best practices without a lot of friction" but if you've got other preferences you probably know how to manage them anyway.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`. The page auto-updates as you edit the file.

You can also add mdx files in `src/pages/` and they will be presented at the cooresponding route.

Tailwind and Emotion are available for styling using utility classes and css-in-js respectively.

Testing is facilitated through React Testing Library and Jest.

`next-seo` and `next-sitemap` are doing their jobs very well. Be sure to update `/next-sitemap.js` and `/next-seo.json` with your information!

## Set up Firebase

### Set up Firebase Application

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
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: 'AIzaSyB6tKhpnB9baUxR8FVC90-gLbERVu_q-uo',
    authDomain: 'test-5398a.firebaseapp.com',
    projectId: 'test-5398a',
    storageBucket: 'test-5398a.appspot.com',
    messagingSenderId: '653030811583',
    appId: '1:653030811583:web:5931db3465d6125688e30a',
    measurementId: 'G-JJXDVMKM9W',
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
</script>
```

Now you copy the `firebaseConfig` and past it into the object for `APP_CREDENTIALS`.

### Firebase Admin SDK keys required for Authentication

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

### Firebase Authentication

1. Navigate to the "Authentication" tab
2. Click "Get Started"

Thats it 👀
