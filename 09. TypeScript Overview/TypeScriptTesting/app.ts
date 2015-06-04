var currentName: string;
var hasPassed: boolean;
var averageMark: number;
var currentCourses: string[];
var additionalInfo: any;
var currentState: State;

enum State { Onsight, Online, NotEnrolled }

function setStudent(name: string, passed: boolean, mark: number, courses: string[], info: any, state: State): void {
    currentName = name;
    hasPassed = passed;
    averageMark = mark;
    currentCourses = courses;
    additionalInfo = info;
    currentState = state;
}

setStudent('Ivaylo', true, 3, ['JS OOP', 'JS DOM'], () => { }, State.Onsight);

function calculateSum(x: number, y: number, z?: number, ...restNumbers: number[]): number {
    var sum = x + y;
    for (var i = 0; i < restNumbers.length; i++) {
        sum += restNumbers[i];
    }
    return sum;
}

var calculate: (x: number, y: number)=> number = calculateSum;

var calcSum = (x, y) => x + y;

function sum(x: string, y: string): number;
function sum(x: number, y: number): number;
function sum(x, y): any {
    if (typeof x == "string") {
        x = parseInt(x);
        y = parseInt(y);
    }
    return x + y;
}