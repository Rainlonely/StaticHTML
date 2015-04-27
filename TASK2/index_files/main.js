var gameConfig = {
	url: 'https://strikingly-hangman.herokuapp.com/game/on',
	initGame : { playerId: 'rain.w.r@gmail.com',  action: 'startGame' },
	sessionID: ''
};

var doAction = function (actionName, resource, jsonStr, domain) {
	var _this = domain;

	$.post(resource, jsonStr)
	 .done(function (data) {
	 	var cb = getCallback(actionName, data, _this);
	 	cb();
	 })
	 .error(function (data) {
	 	_this.remoteData.message = JSON.parse(data.responseText).message;	
	 });
}

var getCallback = function (actionName, data, domain) {
	var _this = domain;

	if(actionName == 'initGame') {
		return function() {
			_this.sessionID = data.sessionId;
	  		_this.remoteData.message = data.message;
	  		_this.remoteData.numberOfWordsToGuess = data.data.numberOfWordsToGuess;
	  		_this.remoteData.numberOfGuessAllowedForEachWord = data.data.numberOfGuessAllowedForEachWord;
		};
	}
	else if(actionName == 'nextWord') {
		return function() {
			_this.gameStatus.isGivenWord = true;
			_this.remoteData.message = data.data.word;
			_this.remoteData.wordCount = data.data.totalWordCount;
			_this.remoteData.numberOfGuessAllowedForEachWord = 10;
		};
	}
	else if(actionName == 'submitResult') {
		return function() {
			alert(data.message + data.data.playerId + data.data.score);
		};
	}
	else if(actionName == 'guessWord') {
		return function() {
			_this.charDOM.css('color','#000');
			_this.remoteData.message = data.data.word;
			_this.remoteData.wordCount = data.data.totalWordCount;
			_this.remoteData.numberOfGuessAllowedForEachWord = 10;
			_this.remoteData.numberOfGuessAllowedForEachWord 
			= parseInt(_this.remoteData.numberOfGuessAllowedForEachWord) - data.data.wrongGuessCountOfCurrentWord;
		}
	}
};



var hiddenChar = [];

Vue.filter('renderChar', function (index) {
	return String.fromCharCode(65 + index);
});

new Vue({
	el: '#container',
	
	data: {
		charDOM: '',
		sessionID: '',
		gameStatus: {
			isStart: false,
			isGivenWord: false
		},
		remoteData: {
			message: 'No more guess left.',
			numberOfWordsToGuess: '',
			numberOfGuessAllowedForEachWord: '',
			wordCount: ''
		},
		result: {
			totalWordCount: '',
			correctWordCount: '',
			totalWrongGuessCount: '',
			score: ''
		}
	},
	methods: {
		getProxy: function (action, guess) {
			var proxyObj = {};
			proxyObj.sessionId = this.sessionID;
			proxyObj.action = action;
			if(typeof guess != 'undefined' && guess != '')
				proxyObj.guess = guess;
		
			return JSON.stringify(proxyObj);
		},
		checkChar: function (e) {
			var _chars = $(e.target).text();
			this.charDOM = $(e.target);

			doAction('guessWord', gameConfig.url, this.getProxy('guessWord', _chars), this);
		},
		startGame: function (e) {
			this.gameStatus.isStart = true;
			doAction('initGame', gameConfig.url, JSON.stringify(gameConfig.initGame), this);
		},
		giveWord: function () {
			doAction('nextWord', gameConfig.url, this.getProxy('nextWord'), this);
		},
		submit: function () {
			doAction('submitResult', gameConfig.url, this.getProxy('submitResult'), this);
		},
		getResult: function () {
			doAction('getResult', gameConfig.url, this.getProxy('getResult'), this);
		}
	}
});