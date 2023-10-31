# Twitter_selenium
Simple Twitter Bot Object, made with Selenium and JavaScript.

## How to Run:
Example code.
```js
TwitterBot = new Twitter_selenium(
    email    = EMAIL,
    password = PASSWORD,
    username = USERNAME
);

await TwitterBot.initialize();
await TwitterBot.login();

await TwitterBot.tweet( "This is a test tweet. You can find more info about it here: https://github.com/Vsimpro/tweetter!" );
```

No guarantees or warranties given. Do not blame me for any usage or cause of such.
