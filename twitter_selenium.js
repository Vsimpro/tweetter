var { Builder, By } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Twitter_selenium {
    constructor(username, password, email) {
        this.email    = email;
        this.username = username;
        this.password = password;
    
        // Can be changed prior to init
        this.browser = "firefox"

        this.errors = {
            0 : "Missing critical information.",
            1 : "Site has changed.",
            2 : "Unknown issue."
        }
        
    }

    async initialize() {
        this.driver = new Builder().forBrowser(this.browser).build();
        await this.driver.get("https://twitter.com");
        await sleep(500);

        return true;
    }

    async login() {       
        var driver = this.driver    
        await sleep(1000);
        
        // Click sign in
        try {
            var   sign_in = await driver.findElement(By.xpath("//span[text()='Sign in']"));
            await sign_in.click();
            await sleep(1000);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 1 ])
            console.log( "Details: " +  e )
            return false;
        }
        
        // Click username input
        try {
            var   uname_box = await driver.findElement(By.xpath("//input"));
            await uname_box.click();
            await uname_box.sendKeys(EMAIL);
            await sleep(1000);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 1 ])
            console.log( "Details: " +  e )
            return false;
        }
        
        // Go further ->
        try {
            var   next_box = await driver.findElement(By.xpath("//span[text()='Next']"));
            await next_box.click();
            await sleep(1000);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 1 ])
            console.log( "Details: " +  e )
            return false;
        }
        
        // Make sure "unusual activity" prompt gets dealt with 
        try {
            var   body = driver.findElement(By.tagName("body"))
            var   text   = await body.getText()
                
            if (String(text).includes("unusual")) {
                await driver.actions().sendKeys(USERNAME).perform();
                await sleep(1000);    
            };

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 0 ])
            console.log( "Details: " +  e )
            return false;
        }
        
        // Go further ->
        try {
            var   next_box = await driver.findElement(By.xpath("//span[text()='Next']"));
            await next_box.click();
            await sleep(1000);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 1 ])
            console.log( "Details: " +  e )
            return false;
        }
                
        try {
            await driver.actions().sendKeys(PASSWORD).perform();
            await sleep(2000);
            
            var   log_in = await driver.findElement(By.xpath("//span[text()='Log in']"));
            await log_in.click();
            await sleep(2000);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 0 ])
            console.log( "Details: " +  e )
            return false;
        }    
        
        console.log( "Logged in succesfully." )
        return true;
    }

    async tweet( text ) {
        var driver  = this.driver 

        //await this.driver.get("https://twitter.com");
        await sleep(1500);

        try {
            // Very specific xpath: prone to break when site changes!
            let status_box   = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/label/div[1]/div/div/div/div/div/div[2]/div"));
            
            await status_box.click();
            await status_box.sendKeys( text );
            await sleep(500);

            // Very specific xpath: prone to break when site changes!
            let   post_button = await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div/span/span")) 
            await post_button.click()
            await sleep(500);

        } catch (e) {
            console.log( "Ran into an error. Likely cause: " +  this.errors[ 1 ])
            console.log( "Details: " +  e )
            return false;
        }
        console.log( "tweeted out: " + text )
        return true;
    }

}

module.exports = Twitter_selenium;
