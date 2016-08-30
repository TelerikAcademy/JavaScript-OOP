# Modules and patterns
==================================

### Task 1.
* Create a module for a `Telerik Academy course`
  * The course has a `title` and `presentations`
    * Each presentation also has a `title`
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has `firstname`, `lastname` and an `ID`
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method `init()`
    * Accepts a `string` - course title
    * Accepts an `array of strings` - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method `addStudent()` which lists a student for the course
    * Accepts a string in the format `'Firstname Lastname'`
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method `getAllStudents()` that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method `submitHomework()`
    * Accepts `studentID` and `homeworkID`
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method `pushExamResults()`
    * Accepts an array of items in the format `{StudentID: ..., score: ...}`
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method `getTopStudents()` which returns an array of the top **10 performing students**
    * Array must be sorted from **best to worst**
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
