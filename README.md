# BaldAuth for react apps
Tiny simple auth, done in browser, with password hashed by webpack during build process and not visible to app users.

## Installation
```shell
npm i react-bald-auth --save
```

## How it works
Wrap any component with `<BaldAuth />` and it will not be rendered until `[passwordHash]` match entered password sha256 hash.

## Usage
### Setup webpack
In order to avoid exposing plain password in your app bundle you need to create password hash during webpack build process. Maybe you use other bundler, but I use webpack in example below.

Also, usually you will setup environment variable (can be done with any modern CI platform) holding plain password.

With that said, typically you will setup `DefinePlugin` within `.plugins` section of webpack config:

```javascript
const
	crypto = require('crypto-js');
 
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // Empty password disables auth
      __PASSWORD_HASH__: JSON.stringify(
        process.env.APP_PASSWORD && crypto.SHA256(process.env.APP_PASSWORD).toString()
      )
    })
  ]
}
```

### Apply BaldAuth to your code
Now you can apply `BaldAuth` passed with password hash. Using composition it can be done with any component. If you use React Router in your app then most reliable way will be wrapping `<Router />`:

```javascript
// Now until passwords hashes match nothing of your app structure will be exposed to user by dev tools
// like Chrome DOM inspector
<BaldAuth passwordHash={__PASSWORD_HASH__}>
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route component={App} path="/" />
  </Router>
</BaldAuth>
```

### Properties
#### Mandatory `passwordHash`
Sha256 hash to be matched to entered password hash.

#### Optional `title`
Message to be shown over auth form.

#### Optional `buttonTitle`
Submit button title.
