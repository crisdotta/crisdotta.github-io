'use strict'
$(document).ready(function(){
   $('body').on({'mousemove': function(e){
    let clientX = e.originalEvent.clientX
    let clientY = e.originalEvent.clientY
    console.log(e.originalEvent)
    $('#cursor').css({
        'left' : (clientX - 40) + 'px',
        'top' : (clientY - 40) + 'px'
    })
   }})

   $('.a').on({
    'mouseover': function(){
        $('#cursor').addClass('mini')
    },
    'mouseout': function(){
        $('#cursor').removeClass('mini')
    },
   });
})