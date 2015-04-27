$(function(){
	var url = 'https://strikingly-hangman.herokuapp.com/game/on';
	var initGame = '  {"playerId": "rain.w.r@gmail.com",  "action" : "startGame" }';
	var sessionID = '';
	
	
	$('#start').click(function(){
		$.post( url, initGame)
			.done(function( data ) {
	  		sessionID = data.sessionId;
	  		initArena(data);	    		
	  		updateStatus(data);
	 	});
	})

	$('#giveWord').click(function(){
		var giveWord = '{"sessionId": "' + sessionID +'", "action" : "nextWord"}';
		$.post(url, giveWord)
			.done(function(data) {
				$('#guessArea span').css('color','#FFF');
				updateDetail(data);
			})
			.error(function(data){
				$('#arena').text(JSON.parse(data.responseText).message);							
			})	})

	$('#guessArea span').click(function(){
		var chars = $(this).text();
		var guessWord = '{"sessionId": "' + sessionID +'",  "action" : "guessWord",  "guess" : "'+ chars +'"} ';
		charsObj = $(this);
		$.post(url, guessWord)
			.done(function(data){
				charsObj.css('color','#000');
				updateDetail(data);
				lifeCount(data);
			})
			.error(function(data){
				$('#arena').text(JSON.parse(data.responseText).message);							
			})
	})

	$('#getResult').click(function(){
		var getResult = '{"sessionId": "' + sessionID +'",  "action" : "getResult"}';
		$.post(url, getResult)
			.done(function(data){
				updateResult(data);
			})
	})

	$('#submit').click(function(){
		var submitResult = '{"sessionId": "' + sessionID +'",  "action" : "submitResult"}';
		$.post(url, submitResult)
			.done(function(data){
				alert(data.message + data.data.playerId + data.data.score);
			})
	})

	function initArena(gameData){
		$('#arena').text(gameData.message);
	  	$('#start').addClass('hidden');
	  	$('#giveWord').removeClass('hidden');
	}

	function updateStatus(gameData){
	  	$('#wordLeft').text(gameData.data.numberOfWordsToGuess);
		$('#lifeLeft').text(gameData.data.numberOfGuessAllowedForEachWord);
	}

	function updateDetail(gameData){
		$('#arena').text(gameData.data.word);	
		$('#wordCount').text(gameData.data.totalWordCount);
		//$('#lifeCount').text(gameData.data.wrongGuessCountOfCurrentWord);
		$('#lifeLeft').text('10');
	}

	function updateResult(gameData){
		$('#wordCount').text(gameData.data.totalWordCount);
		$('#rightWord').text(gameData.data.correctWordCount);
		$('#lifeUse').text(gameData.data.totalWrongGuessCount);
		$('#score').text(gameData.data.score);
	}

	function lifeCount(gameData){
		var lifeLeft = parseInt($('#lifeLeft').text()) - gameData.data.wrongGuessCountOfCurrentWord;
		$('#lifeLeft').text(lifeLeft);
	}

})