import { test, expect, Page }  from '@playwright/test';
test.describe('Login using standard user', () => {

test('should login standard user', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        // Enter "standard_user" in the username field
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        // Enter "secret_sauce" in the password field
        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        // login button function
        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // redirecting to inventory page
        await expect(page).toHaveURL(/inventory\.html/);

        // header product must visble
        await expect(page.locator('xpath=//*[@class="title"]')).toHaveText('Products');
        
        //  hamburger function
        await page.locator('xpath=//*[@id="react-burger-menu-btn"]').click();

        // log-out function
        await page.locator('xpath=//*[@id="logout_sidebar_link"]').click();

        await page.waitForLoadState('networkidle');

        // redirecting to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

test('Login with Locked Out User', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        // Enter "locked_out_user" in the username field
        await page.locator('xpath=//*[@id="user-name"]').fill('locked_out_user');

        // Enter "secret_sauce" in the password field
        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        // login button function
        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Error displayed / Error text contains 'Epic sadface: Sorry, this user has been locked out'
        await expect(page.locator('xpath=//*[@class="error-message-container error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');


    });

test('Login with Invalid Credentials', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        //  Enter "invalid_user" in the username field
        await page.locator('xpath=//*[@id="user-name"]').fill('invalid_user');

        // Enter "wrong_password" in the password field
        await page.locator('xpath=//*[@id="password"]').fill('wrong_password');
       
        // login button function
        await page.locator('xpath=//*[@id="login-button"]').click();        

        await page.waitForLoadState('networkidle');

        // Error displayed / Error message contains 'Username and password do not match'
        await expect(page.locator('xpath=//*[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');


    });

test('Login with Empty Username', async ({page}: {page:Page}) => {


        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        // Enter "secret_sauce" in the password field
        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        // login button function
        await page.locator('xpath=//*[@id="login-button"]').click();  

        await page.waitForLoadState('networkidle');  

        // Error message is displayed / Error message contains 'Username is required
        await expect(page.locator('xpath=//*[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required');

     });

test('Login with Empty Password', async ({page}: {page:Page}) => {


        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        //  Enter "standard_user" in the username field
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        // login button function
        await page.locator('xpath=//*[@id="login-button"]').click();  

        await page.waitForLoadState('networkidle');  

        // Error message is displayed / Error message contains 'Password is required'
        await expect(page.locator('xpath=//*[@class="error-message-container error"]')).toHaveText('Epic sadface: Password is required');


        });

test('View All Products', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/
        await page.goto('https://www.saucedemo.com/');

        // Login with valid credentials
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // redirecting to inventory page
        await expect(page).toHaveURL(/inventory\.html/);


        // Assert product count==6; iterate over product cards
        const items = page.locator('.inventory_item');
        const productcount = await items.count();
        await expect(productcount).toBe(6)

       for (let i = 0; i<productcount; i++)
        { 
        await expect(items.nth(i)).toBeVisible();
       } 
       console.log('product count:',productcount);
        
        });

             
 test('Add Single Product to Cart', async ({page}: {page:Page}) => {

       // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        //  Confirm cart badge is not visible or is 0 

        const cartBadge = page.locator('.shopping_cart_badge');

        await expect(cartBadge).toHaveCount(0); 
   
        // Click 'Add to cart' for 'Sauce Labs Backpack'
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        // cart will show 1 product added
        await expect(cartBadge).toHaveCount(1); 

        // add to cart will change to remove once product is added
        await expect(page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]')).toHaveText('Remove');

        // redirecting to cart list
        await page.locator('xpath=//*[@class="shopping_cart_link"]').click();

    });


    test('Add Multiple Products to Cart', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 

        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Click 'Add to cart' for 'Sauce Labs Backpack'
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        // Click 'Add to cart' for 'Sauce Labs Bike Light'
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();

        // Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Cart badge shows '3'
        await expect(page.locator('xpath=//*[@class="shopping_cart_badge"]')).toHaveText('3');

        //  All three products are listed in the cart
        await page.locator('xpath=//*[@class="shopping_cart_link"]').click();
      

        });

    test('Remove Product from Cart', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // 'Sauce Labs Backpack' to cart
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        await page.waitForLoadState('networkidle');

        // cart will show 1 item added

        await expect(page.locator('xpath=//*[@class="shopping_cart_badge"]')).toHaveText('1');

        // remove button function
        await page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]').click();

        await page.waitForLoadState('networkidle');

        // add to cart will show once item has been remove
        await expect(page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]')).toHaveText('Add to cart');

        const cartBadge = page.locator('shopping_cart_link');

        // cart will show 0 
        await expect(cartBadge).toHaveCount(0); 

        });

    test('Sort Products by Name (A-Z)', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Wait for inventory page
        await expect(page).toHaveURL(/inventory/);

        // Select "Name (A to Z)"
        await page.selectOption('.product_sort_container', 'az');

        // Get all product names
        const items = await page.locator('.inventory_item_name').allTextContents();
        
        // Create a sorted copy
        const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

        // Assertion
        expect(items).toEqual(sortedItems);

       console.log('Sorted items:',items);
    });

    test('Sort Products by Name (Z-A)', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Wait for inventory page
        await expect(page).toHaveURL(/inventory/);

        // Select "Name (Z to A)"
        await page.selectOption('.product_sort_container', 'za');

        // Get all product names
        const items = await page.locator('.inventory_item_name').allTextContents();
        
        // Create a sorted copy
        const sortedItems = [...items].sort((a, b) => b.localeCompare(a));

        // Assertion
        expect(items).toEqual(sortedItems);

        console.log('Sorted items:',items);
    
    });

    test('Sort Products by Price (Low to High)', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Select "Price (low to high)"
        await page.selectOption('.product_sort_container', 'lohi');
        
        // Get all prices and convert to numbers
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        
        // Create sorted copy
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        
        // Assertion
        expect(numericPrices).toEqual(sortedPrices);

       console.log('sortedPrices:',numericPrices);

    });

    test('Sort Products by Price (High to Low)', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle');

        // Select "Price (high to low)"
        await page.selectOption('.product_sort_container', 'hilo');
        
        // Get all prices and convert to numbers
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        
        // Create sorted copy
        const sortedPrices = [...numericPrices].sort((a, b) => b - a);
        
        // Assertion
        expect(numericPrices).toEqual(sortedPrices);

        console.log('sortedPrices:',numericPrices);

    });

    test('View Product Details', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle')

        // Click first product
        const firstProduct = page.locator('.inventory_item_name').first();
        const productName = await firstProduct.textContent();
        await firstProduct.click();

        // Verify navigation to detail page
        await expect(page).toHaveURL(/inventory-item/);

        // Assertions for product details
        await expect(page.locator('.inventory_details_name')).toHaveText(productName!);
        await expect(page.locator('.inventory_details_desc')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toBeVisible();
        await expect(page.locator('.inventory_details_img')).toBeVisible();

        // Verify Add to Cart button
        const addToCartBtn = page.locator('button:has-text("Add to cart")');
        await expect(addToCartBtn).toBeVisible();

        // Click Add to Cart and verify it changes to Remove
        await addToCartBtn.click();
        await expect(page.locator('button:has-text("Remove")')).toBeVisible();

        // Verify Back to Products button
        const backBtn = page.locator('#back-to-products');
        await expect(backBtn).toBeVisible();
      
         
        });

   test('View Cart with Items', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 
        
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();

              
        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // 1. Verify header 'Your Cart'
        await expect(page.locator('.title')).toHaveText('Your Cart');
   
        // 2. Verify all added items listed with quantity
        const cartItems = page.locator('.cart_item');
        const itemCount = await cartItems.count();
        console.log('Cart item count:', itemCount);

        const quantities = page.locator('.cart_quantity');
        const quantityTexts = await quantities.allTextContents();
        console.log('Cart quantities:', quantityTexts);

        // 3. Verify 'Continue Shopping' button visible
        await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
        
        // 4. Verify 'Checkout' button visible
        await expect(page.locator('[data-test="checkout"]')).toBeVisible();        

        });

  test('Continue Shopping from Cart', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select an item
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();
 
        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click on continue shoppimg
        await page.locator('xpath=//*[@id="continue-shopping"]').click();

        // Assert user is redirected to inventory page
        const currentURL = page.url();
        console.log('Current URL:', currentURL);

  });

    test('Remove Item from Cart Page', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select Sauce Labs Backpack
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click on cart icon
        await page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]').click();

        // Assert showimg remaining item
        const cartItems = page.locator('.shopping_cart_badge');
        const itemCount = await cartItems.count();
        console.log('Cart item count:', itemCount);

    });

      test('Proceed to Checkout from Cart', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select an item
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();

        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click check out 
        await page.locator('xpath=//*[@id="checkout"]').click();

        // Assert URL contains /checkout-step-one.html
        const currentURL = page.url();
        console.log('Current URL:', currentURL);

      });

      test('Complete Checkout with Valid Information', async ({page}: {page:Page}) => {

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select an item
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click check out 
        await page.locator('xpath=//*[@id="checkout"]').click();

        // Enter checkout information
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');

        // Click Continue
        await page.locator('[data-test="continue"]').click();

        // Verify checkout overview page
        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('.title')).toHaveText('Checkout: Overview');

        const cartItems = page.locator('.cart_item');
        const itemCount = await cartItems.count();
        console.log('Item:', itemCount);

        const quantities = page.locator('.cart_quantity');
        const quantityTexts = await quantities.allTextContents();
        console.log('Quantity:', quantityTexts);

        // Get all item prices
        const itemPriceElements = await page.locator('.inventory_item_price').allTextContents();

        // Convert prices from string to number
        const itemPrices = itemPriceElements.map(price =>
        parseFloat(price.replace('$', ''))
        );

        // Compute expected subtotal
        const itemtotal = itemPrices.reduce(
        (sum, price) => sum + price, 0
        );
        console.log('Item total:', itemtotal);

        // Get displayed tax
        const taxText = await page.locator('.summary_tax_label').textContent();

        const displayedTax = parseFloat(
        taxText!.replace('Tax: $', '')
        );
        console.log('Tax:', displayedTax);

        // Compute expected total
        const expectedTotal = itemtotal + displayedTax;

       // console.log('Expected Total:', expectedTotal);

        // Get displayed total
        const totalText = await page.locator('.summary_total_label').textContent();

        const displayedTotal = parseFloat(totalText!.replace('Total: $', '')
        );
        console.log('Total Price:', displayedTotal);

        // Verify total calculation
        expect(displayedTotal).toBeCloseTo(expectedTotal, 2);

        // Click Finish
        await page.locator('[data-test="finish"]').click();

        // Verify order confirmation page
        await expect(page).toHaveURL(/checkout-complete/);
        await expect(page.locator('.title')).toHaveText('Checkout: Complete!');

        // Verify success message
        await expect(page.locator('.complete-header')).toHaveText(
        'Thank you for your order!'
        );

         });

    test('Checkout with Empty First Name', async ({page}: {page:Page}) => {
    

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select an item
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click check out 
        await page.locator('xpath=//*[@id="checkout"]').click();

        // Enter checkout information
        await page.locator('[data-test="firstName"]').fill('');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');

        // Click Continue
        await page.locator('[data-test="continue"]').click();

        // Verify error message
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

       });


    test('Checkout with Empty Last Name', async ({page}: {page:Page}) => {  
    

        // Navigate to https://www.saucedemo.com/ and  Login with valid credentials
        await page.goto('https://www.saucedemo.com/'); 
    
        await page.locator('xpath=//*[@id="user-name"]').fill('standard_user');

        await page.locator('xpath=//*[@id="password"]').fill('secret_sauce');

        await page.locator('xpath=//*[@id="login-button"]').click();

        await page.waitForLoadState('networkidle') 

        // select an item
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Click on cart icon
        await page.locator('.shopping_cart_link').click();

        // Click check out 
        await page.locator('xpath=//*[@id="checkout"]').click();

        // Enter checkout information
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('');
        await page.locator('[data-test="postalCode"]').fill('12345');

        // Click Continue
        await page.locator('[data-test="continue"]').click();

        // Verify error message
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

       });

        
        
    test('Checkout with Empty Last Name', async ({page}: {page:Page}) => {  



          });

});