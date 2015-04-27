   
    


$(document).ready(function(){
	/*  panorama360 */
	$('.panorama-view').panorama360({
		sliding_controls:true,
		start_position: yooxmas14.currentStyleStartPosition - (Math.floor(($("#mainContainer").outerWidth() - 980) / 2)),
		use_mouse_wheel:0
	})

    /* move style slider */
    $('.panorama-view').bind("PANORAMA360_POSITION", function(obj,pos ) {
        var winW = $(".panorama-view").outerWidth();
        pos = pos - 0;
        var styleFound = false;
        var firstStyle = "";
        var checkPosition = -winW;
        for (var style in yooxmas14.styleIntervalPosition) {
            var leftFix = Math.round(((winW - yooxmas14.styleIntervalPosition[style][0] + yooxmas14.styleIntervalPosition[style][0]) / 2));
            if (checkPosition < yooxmas14.styleIntervalPosition[style][0]) {
                firstStyle = style;
                checkPosition = yooxmas14.styleIntervalPosition[style][0];
            }
            if (((yooxmas14.styleIntervalPosition[style][0] + leftFix - 0) > pos) && ((yooxmas14.styleIntervalPosition[style][1] + leftFix - 0) <= pos)) {
                styleFound = true;
                //selectStyleByStylename(style);
                break;
            }
        }
        // if (!styleFound && firstStyle) {
        //     selectStyleByStylename(firstStyle);
        // }

    });

   	$(".wrap").hover(function(){
   		$(".controls").fadeToggle( "slow", "linear" );
   	});

   $(".activeVideoPlayer").click(function(){
   	   	var videoId = this.rel;
   		showLayer(videoId);
   })
	
   $(".overlay").click(function(){
   		$("#overlay").fadeTo("slow", 0).hide();
        $("#videoLayer").hide();
   })

    var showLayer = function(videoId) {
	    $('#overlay').fadeTo("slow", 0.7).show();
	    $('#videoLayer').show();
	    showVideo(videoId);
	    changeQuestion(videoId);
	};

    var showVideo = function(videoId) {
    	    player = new YKU.Player('youkuplayer',{
				styleid: '5',
				client_id: 'YOUR YOUKUOPENAPI CLIENT_ID',
				vid: videoId
			});
    };

    function changeQuestion(videoId){
    	
    	for(var i = 0; i < questionList.list.length; i++){
    		if(videoId===questionList.list[i].videoID){
    			$('.quiz p').text(questionList.list[i].q);
    			$( "ul li:nth-child(1) input").attr("value",questionList.list[i].a1);
    			$( "ul li:nth-child(2) input").attr("value",questionList.list[i].ar);
    			$( "ul li:nth-child(3) input").attr("value",questionList.list[i].a3);
    			$( "ul li:nth-child(1) label").text(questionList.list[i].a1);
    			$( "ul li:nth-child(2) label").text(questionList.list[i].a2);
    			$( "ul li:nth-child(3) label").text(questionList.list[i].a3);
    		} 
    	}
    }

	 $(".send").click(function(){
	 	$(".quiz").removeClass("active");
	 	if($("input[name=answer]:checked").val() == "bingo"){
	 		$(".right").addClass("active");
	 	} else {
	 		$(".wrong").addClass("active");
	 	}
	 });

	 $(".replay").click(function(){
	 	$(".wrong").removeClass("active");
	 	$(".quiz").addClass("active");
	 });

	$(".mfp-container").click(function(){
		$(".mfp-bg").remove();
		$(".mfp-wrap").hide();
	});

	// WB2.anyWhere(function(W){
	//     W.widget.publish({
	//         'id' : 'wb_publish',
	//         'default_text' : '#YOOXMAS#',
	//         'default_image' : 'http://cdn2.yoox.biz/yoox14/sections/yooxmas14/dinner360/VENEZIA_10_def_high.jpg',
	//         'callback' : function() {
	//             $('.right').removeClass('active');
	//             $('.sharing').addClass('active');
	//         }
	//     });
	// });

	$("#wx_publish").click(function(){
		$("body").append('<div class="mfp-bg mfp-ready"></div>');
		$(".mfp-bg").addClass("pop-in");
		$(".mfp-wrap").css('display','block');
	});




})