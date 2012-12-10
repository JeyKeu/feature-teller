Feature Teller
==============

Feature Teller is a SMS-style ticker like display which shows features of your shiny app.

A Quick Demo
============

I have already used it in my [Sprite2CSS](http://projects.junaidbaloch.com/sprite2css/) app.

USAGE
=====

1- Feature Teller depends on jQuery so, include jQuery javascript library.

2- Then include the FeatureTeller.js

3- and then initilize it

    <script type="text/javascript">
         /*
             Wait for the page to be ready.
         */
         jQuery(function($){
         
            /*Create an instance of Feature Teller.*/
            var ft = new  FeatureTeller($); 
             var duration = 8000;
             
             /*Initialize it with the id of the div it will work in and duration(in milliseconds) it will wait between features*/
             ft.init('#features', {
                 'duration': duration
             });
         
         });
    </script>

4- The HTML

    <div id="features"></div>
    
5- Spread the word!
    