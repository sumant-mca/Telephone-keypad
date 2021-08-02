

(function($){
 $.fn.keypad=function(options){
   var options=$.extend({width:250,height:200},options);
   var ele=this;
   var map_text={};
   
   /* Each button store different letter in array */
   var target={
         init:function(){
           map_text={
             "1":"1</br> . , !","2":"2</br> a b c","3":"3</br> d e f",
             "4":"4</br> g h i","5":"5</br> j k l","6":"6</br> m n o",
             "7":"7</br> p q r s","8":"8</br> t u v","9":"9</br> w x y z",
             "10":"*","11":"0","12":"#"
           };
          
        },
        markup:function(){
          var input=document.createElement("INPUT");
          input.style.display="block";
          input.style.width=options.width-5+"px";
          input.style.height="28px";
          input.style.margin="0px 0px 5px 0px";
          input.style.padding="0px";
          input.style.fontSize="18px";
          ele.append(input);
          ele.css({"width":options.width,"height":options.height,"display":"block"});
          for(var key in map_text){
            var button=document.createElement("BUTTON");
            button.style.display="inline-block";
            button.style.height=(options.height/3)-4+"px";
            button.style.width=(options.width/3)-4+"px";
            var fontSize=((options.width/3)-3)/5;
            button.style.margin="2px 2px";
            button.style.fontSize=fontSize+"px";
            button.setAttribute("data-value",key);
            button.innerHTML=map_text[key];
            $(ele).append(button);
          }
          
        }
   };
  target.init();    
  target.markup();
  $(ele).find("button").mouseup(function(event){
            var button_val=$(event.currentTarget).attr("data-value");
            $(ele).children("input").val(inputmessage($(ele).children('input').val(),button_val));
  });
  function inputmessage(text,button_pressed){
    if($("#time").length)
    {  
      var currenttime=+new Date();
      var diff=currenttime-$("#time").val();
      document.getElementById("time").value=currenttime;
    }
    else
    {
      var inp=document.createElement("INPUT");
      inp.setAttribute("type","hidden");
      inp.setAttribute("id","time");
      inp.setAttribute("value",+new Date());
      document.body.appendChild(inp);
    }
    var str=$(event.currentTarget).text();
    str=str.split(" ");
    var i=0;

    if(diff && diff>3000)
     return text+str[i];
   if(button_pressed!=0 && button_pressed<=9)
   {

     if(!diff||diff<1500)
     {
      if(text[text.length-1]==str[i])
      {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i+1];  
     }
     else if(text[text.length-1]==str[i+1])
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i+2];  
     }
     else if(text[text.length-1]==str[i+2]&&str.length==4)
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text= arr+str[i+3];  
     }
     else  if(text[text.length-1]==str[i+2]||text[text.length-1]==str[i+3])
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i];
     }
     else
      text=text+str[i];
  }
  else
  {
    text=text+str[i];    
  }
}
else
  text=text+$(event.currentTarget).text();
return text;
}
return target;  
};
}(jQuery));
