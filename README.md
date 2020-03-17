# crudapp

Tania Dodson (github.com/codergirl2320/crudapp)
crud-app
To access my app, please click the following link: https://floating-badlands-60887.herokuapp.com/

Technologies used:
HTML
CSS
EJS
Express
Mongoose
Bcrypt
Method-Override
EJS Partials

<!-- //APP EXPLANATION: -->

Cake decorating is one of my MANY hobbies and I tried to make a business out of it a few years back. I have a FB page and business cards - but I never had a website. So I was really excited to do that for this project. Because this site doesn’t have all of it’s layers yet - I want to explain the concept behind it. In my business, I was creating the stationary, decorations as well as cakes and other treats. So when I was brainstorming for a name, I was thinking about how I’m offering these three different things that all work together - kind of like a three-ring circus…and nothing is MORE like a three-ring circus than a kid’s birthday party - and if you’re selling theme parties - it makes sense for your business to have a theme - and the circus theme made me the ringmaster - so it was perfect! And “Eye Candy” was just because that’s a phrase I use a lot personally when I get obsessed with something and get joy out of looking at it.

So, Steve and I were saying one day that the projects are actually easier than the homework because if something isn’t working - you just change your idea - rather than the homework assignment that isn’t changing. But for me, in this case, I didn’t want to change it - I wanted it to match my FB page and business cards which posed a challenge. This red & white striped header. You can’t drop in a jpg…it has to be responsive. I was like - should I make a bunch of divs and alternate the colors? But I don’t think that’s going to work either…so I researched. And found SVG! Scalable Vector Graphics. Vector - if you aren’t familiar with that term - just means that the graphics are made of lines going from point to point - unlike the pixels in images (the larger you make them the worse they look)…vector images never loose quality. I had those in the design world, didn’t know I had them here. So I found this website that offered pattern fills to be copy/pasted - but I was all no - I want to learn how to build it myself. So I found another website that explained how to do all sorts of patterns - except stripes. Which was perfect, because I had to figure it out. But I did and it’s exactly what I wanted. Only problem is that when I tried to get it to stay put when I scroll - it only screwed it up.

The logo and ringmaster are files that I dropped in. I chose the font from Google because it had the Seuss-y quality I wanted. I attempted to use the exact fonts I used in InDesign on my business card because I thought it would be easy - maybe drop them into a folder in Atom like I did my images…so I researched how to do it…found a “web font generator” website and instructions - it was just a folder in the public folder and some code to paste into CSS - but they looked TERRIBLE - so I couldn’t use them and stuck with Google.

And I added a favicon to the tab.

This is the Sign up page

This is the Log in page - I didn’t want it to just redirect back to this page if you enter your info incorrectly, I felt like there should be an explanation - so I duplicated the new.ejs in sessions and added this one line…and of course created a get route for the new page and changed the redirects in the sessions controller post route to go to it. And it’s all encrypted. And it welcomes the user.

This is the index page…I added “log out” functionality. The button to add a new cake is at the bottom.

The show page has more pics, and basically the website at this point is just selling the pre-made fondant decorations as a set - so you would order a plain cake from a bakery and add the decorations yourself. My order button has the same functionality as my mongoose store - decreases qty until it changes to “out of stock”. Back to Index link and edit and delete buttons on the right.

The edit page - it just shows you what you already have so you can edit it or add a new image. (add an image and edit) I had many issues - but I’m going to come back to that in a minute. Back to the show page link.

Here’s the new page…and the delete function works.

It’s all responsive…from a iPhone 5 to an iPad to my big monitor…or so Chrome Dev Tools would have you believe. At 1am I actually looked at it on my iPhone and iPad and the images are stretching down the length of the page - so I’ll have to figure that out. Lesson - don’t trust Chrome Dev Tools. Used a media query for small screens.

And I added the FB logo which links to my FB page. AND it opens it in a new window. And that code looks like this…footer.ejs (line 2)

Show code…

<!-- //ISSUES: -->

So - issues:

Originally the edit page WOULD NOT save my edits. I compared the code to my mongoose store and found this extra space in the input tag between the quotation mark and the slash - I thought - that can’t be it - but it was the only difference and sure enough - that did it. So if you ever have that problem. (line 27)

To get the multiple images on the show page, but only the first one on the index page -
 - changed Schema to array of strings separated by commas
 - post route - split at commas (line 47) & put route (line 76)
 - add for loop to show.ejs (line 14)
 - index.ejs added [0] to select first image (line 20)

HOWEVER, at that point I realized that if I wanted to add a new image and I just put one image string in the edit field - it didn’t ADD it - it EDITED it - so that everything else was gone. So I was all - every time I want to add a picture I have to type ALL of the image strings - which could be a lot - PLUS you have to know EXACTLY what they all are…ummm, no.

So I thought - when I add an image - I need it to push that image into the array. Which I can’t do in THAT field, so I need a new field for adding images on the edit.ejs page (lines 20-24)…which will need its own put route that separates at the commas and redirects back to the edit page. Learned about “$push” (line 60-66)

<!-- //CODE: -->

Code stuff:

During all of this I had to reach out to Dan once and he showed me something new called “Morgan”…npm i morgan…to install…server.js = require it and app.use it (lines 3 & 21)

images in image folder

:root thing Alex taught us

created all my seed data so I didn’t have to stress about losing it

EJS partials

didn’t use a framework because I knew what I wanted to do and agreed with Matt that a framework would probably cause more issues than it solved


<!-- //THINGS TO ADD: -->

I want to add:

my story, contact me, models for treats, decorations and stationary

photo galleries of events

360 videos of the cakes

review page with timestamps


![alt text](IMG_3204.PNG)

