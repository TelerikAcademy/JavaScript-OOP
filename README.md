# JavaScript-OOP
JavaScript OOP Course Repository

## Preparing the local machine for Unit testing with Mocha and Chai 

*	Install [Node.js](https://nodejs.org/ "Node.js")
	*	Try if it is working by typing in CMD/Terminal `$ node -v` (should produce result)
*	Open CMD/Terminal and run `$ npm install -g mocha`

## Preparing for the tests for each homework

*	Checkout the repository for the particular homework	
*	Open CMD/Terminal and navigate to the checked out repository with the homework
*	Run `npm install` in CMD/Terminal
	*	A folder `node_modules` should appear
*	You are ready to run the tests

## Running the tests

*	Navigate to the folder of the particular homework in CMD/Terminal
*	Requirements:
	*	JavaScript files must be called task-1.js, task-2.js etc..
	*	Each .js file must contain `module.exports=[name of the object/function]`
* 	Run `npm test`
	*	Test results should appear on the CMD/Terminal
	
## Upload in [BGCoder.com](http://bgcoder.com/)

*	Go to the specific homework
*	Select the task you will be sending
*	Wrap your result in:

		function solve() {
			return [your solution object/function];
		}
	