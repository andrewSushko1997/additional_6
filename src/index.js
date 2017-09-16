module.exports = function zeros(expression) {
  // your solution
  var factorialCells = expression.split('*').map(function(a) {
  	return a.split('');
  }); 

  var attentionArray = [];
  var numbersArray = [];
  var attentionCount;
  var resultsArray = [];
  var mainResult;
  for(var i = 0; i < factorialCells.length; i++) {
  	attentionCount = 0;
  	for(var j = 0; j < factorialCells[i].length; j++) {
  	 
  		if(factorialCells[i][j] === '!') {
  			attentionCount++;
  		}

  	}
factorialCells[i].splice(factorialCells[i].length - attentionCount, attentionCount);
  attentionArray.push(attentionCount);
  }
  numbersArray = factorialCells.map(function(a) {
  	return a.join('');
  });

  for(var i = 0; i < numbersArray.length; i++) {
  	resultsArray.push(factorial(numbersArray[i], attentionArray[i]));
  }

 
  mainResult = resultsArray.reduce(function(a, b) {
  	return multiply(a, b);
  });

  var mainResultArray = mainResult.split('');

  var zerosCount = 0;
  for(var i = mainResultArray.length - 1; i > 0; i--) {
  	if(mainResultArray[i] != 0) break;
  	if(mainResultArray[i] == 0) zerosCount++;
  }

  return zerosCount;
}

function factorial(number, attentionNumber) {
	var numbers = [];
	var result;
	for(var i = number; i >= 1; i -= attentionNumber) {
		numbers.push(i + '');
	} 
	result = numbers.reduce(function(a, b) {
		return multiply(a, b);
	});
	return result;
}

function multiply(first, second) {
  var firstArray = first.split('').reverse(),
  		secondArray = second.split('').reverse();
  var multiplyArray = [];
  for(var i = 0; i < secondArray.length; i++) {
  	for(var j = 0; j < firstArray.length; j++) {
  		if(i === 0) {
  			multiplyArray.push(secondArray[i] * firstArray[j]);
  		} else {
  			if(multiplyArray[i + j] === undefined) multiplyArray[i + j] = 0;
  			multiplyArray[i + j] += (secondArray[i] * firstArray[j]); 
  		}
  	}
  }

  for(var k = 0; k < multiplyArray.length; k++) {
  	if(multiplyArray[k] > 9) {
  		var ones = multiplyArray[k] % 10,
  				tens = Math.floor(multiplyArray[k] / 10);
  		multiplyArray[k] = ones;
  		if(multiplyArray[k + 1] === undefined) multiplyArray[k + 1] = 0;
  		multiplyArray[k + 1] += tens;
  	}
  }

  return multiplyArray.reverse().join('');
}
