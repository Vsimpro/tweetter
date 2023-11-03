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
##
No guarantees or warranties given. Do not blame me for any usage or cause of such.
## Speaking of Which, SEEMS LIKE THIS HAS ALREADY BROKEN.
Due to the nature of direct 'xpath' paths, some of the functionalities have already been broken. 
In the future, I'll likely try to make them more universal. Don't hold your breath.
