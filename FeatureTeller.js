/* 
 * FeatureTeller is a SMS-style ticker like display which shows features of your shiny app
 * 8:43 PM 5/5/2012
 * @author Junaid Qadir Shekhanzai <shekhanzai.baloch@gmail.com>
 */

var FeatureTeller = function($){
    "use strict";
    var _container = '',
    _directions = {
        FORWARD: 'Forward', 
        BACKWORD: 'Backword'
    },
    _text =[],
    _pause = false,
    _step = false,/*When paused this will help step to next/previous item*/
    _duration = 8000,
    _currentIndex = 0,
    _previousIndex= -1,
    _nextIndex= 1,
    _timer = '',
    _direction = _directions.FORWARD;
    var next = function(){
        _previousIndex = _currentIndex;
        _currentIndex ++;
        _nextIndex = _currentIndex + 1;        
        if(_currentIndex >= _text.length){            
            _currentIndex = 0;
            
        }
        if(_nextIndex >= _text.length){
            _nextIndex = _currentIndex + 1;
        }
    };
    
    var previous = function(){
        _previousIndex = _currentIndex;
        _currentIndex --;
        if(_currentIndex <0){           
            _currentIndex= _text.length - 1;
        }        
    };
    var displayText = function(){
        if(_pause && !_step){
            return;
        }
        window.clearTimeout(_timer);
        _timer = "";
        $(_container +  '> .currentDiv').fadeOut("fast", function(){
            $(_container +  '> .currentDiv').html( _text[_currentIndex] ).fadeIn("slow");
        });

        switch(_direction){
            case _directions.FORWARD:{
                next();
                break;
            }
            case _directions.BACKWORD:{
                previous();
                break;
            }
        }
        /*
         *Only auto play when not paused
         **/
        if(!_step){
            play();
        }
    };
    var play = function(){
        if(!_pause){
            _timer = window.setTimeout(function(){           
                displayText();
            }, _duration);
        }
    };
    return {
        init : function(conatinerId, options){
            _container = conatinerId;
            $(_container).hover (function(){
                $(this).css("background-color","#f0f0f0");
            }, function(){
                $(this).css("background-color","transparent");
            });
            if(typeof options === "undefined"){
                return ;
            }
            if (typeof options.text !== "undefined"){
                _text = options.text;
            }
            if (typeof options.duration !== "undefined"){
                _duration = options.duration || 8000;
            }
            
            $(_container).append(
                '<div class="featureTeller">&nbsp;Feature Teller:&nbsp;</div><div class="featureNav"><a title="Previous" href="javascript:;" class="stepPrev">&lt;</a><a title="Next" href="javascript:;" class="stepNext">&gt;</a></div><div class="currentDiv">&nbsp;</div>');
            $(_container).css("overflow","hidden");
            $(_container).css("height","18px");
            $(_container).css("position","relative");
            $(_container).css("font","tahome, arial");
            $(_container).css("font-size","12px");
            $(_container + ',' + _container + '> .currentDiv' ).css("padding-left", "2px");
            $(_container + ',' + _container + '> .currentDiv').css("padding-right", "2px"); 
            $(_container + '> .featureTeller').css("float", "left");
            $(_container + '> .featureTeller').css("font-weight", "bold");
            $(_container + '> .featureTeller').css("border-radius", "3px 0px 0px 3px");
            $(_container + '> .featureTeller').css("background-color", "#eeeeee");
            $(_container + '> .featureNav').css("float", "left");
            $(_container + '> .currentDiv').css("float", "left");
            $(_container + '> .currentDiv').css("display", "block");
            $(_container + '> .currentDiv').css("width", "80%");
            $(_container +  '> .currentDiv').html("Loading...");
            $(_container + '> .featureNav > .stepPrev').on("click", function(){
                _direction = _directions.BACKWORD;
                displayText();
            });
            $(_container + '> .featureNav > .stepNext').on("click", function(){
                _direction = _directions.FORWARD;
                displayText();
            });
            $.getJSON('feature_teller.json', null, function(response){
                _text.push("This is version " + response.app_version + "." +  response.app_build + " of <strong>" + response.app_name + "</strong>");
                _text.push(response.app_name + " - " +  response.app_desc);
                for(var feat in response.features){
                    _text.push(response.features[feat]);
                }
                $(_container +  '> .currentDiv').fadeOut("slow", function(){
                    $(_container +  '> .currentDiv').html( _text[_currentIndex] ).fadeIn("slow");
                });
                $(_container +  '> .currentDiv').hover (function(){
                    _pause = true;
                }, function(){
                    _pause = false;
                    play();
                });
                play();
            });
        }  
    };
};
