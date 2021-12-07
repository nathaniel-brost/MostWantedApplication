"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

//let nameQ = ("Who are you looking for?");
// let dataNames = data.firstName;
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
// console.log(data[0].firstName);
// promptFor(nameQ,chars);


// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  //code to validate, what will we accept
  return true; // default validation only
}


// app is the function called to start the entire application
let occArray =[];
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'.", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let genArray = [];
      let userQ1 = prompt("Do you know the person's gender? Enter 'yes' or 'no'.");
      if (userQ1 == "yes"){
        let userInputGender = prompt("Enter a gender; 'female' or 'male'");
        genArray = people.filter(function(el){
          return (el.gender == userInputGender);
        });
      }
      else {
        genArray = people;
      }
      console.log(genArray);

      let heightArray = [];
      let userQ2 = prompt("Do you know the person's height? Enter 'yes' or 'no'.");
      if (userQ2 == "yes"){
        let userInputHeight = prompt("Enter the person's height in inches."); 
        heightArray = genArray.filter(function(el){
          return (el.height == userInputHeight);
        });
      }
      else {
        heightArray = genArray;
      }        
      console.log(heightArray);

      let weightArray = [];
      let userQ3 = prompt("Do you know the person's weight? Enter 'yes' or 'no'.");
      if (userQ3 == "yes"){
        let userInputWeight = prompt("Enter the person's weight in pounds.");
        weightArray = heightArray.filter(function(el){
          return (el.weight == userInputWeight);
        });
      }
      else {
        weightArray = heightArray;
      }
      console.log(weightArray);

      let eyeArray = [];
      let userQ4 = prompt("Do you know the person's eye color? Enter 'yes' or 'no'.");
      if (userQ4 == "yes"){
        let userInputEye = prompt("Enter the person's eye color.");
        eyeArray = weightArray.filter(function(el){
          return (el.eyeColor == userInputEye);
        });
      }
      else {
        eyeArray = weightArray;
      }
      console.log(eyeArray);

      occArray = [];
      let userQ5 = prompt("Do you know the person's occupation? Enter 'yes' or 'no'.");
      if (userQ5 == "yes"){
        let userInputOccupation = prompt("Enter the person's occupation.");
        occArray = eyeArray.filter(function(el){
          return (el.occupation == userInputOccupation);
        })
      }
      else {
        occArray = eyeArray;
      }
      console.log(occArray);
      
      if (occArray.length == 1){
        searchResults = occArray[0];
      }
      else if (occArray.length > 1){
        alert("Your need to filter your results further.")
        app(people);
      }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  
  mainMenu(searchResults, people);

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */


  if (!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  
  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'i' for info, 'f' for family, or 'd' for descendants? Type the option you want, 'restart', or 'quit'");

  switch(displayOption){
    case "i":
      console.log(person[0])
    // TODO: get person's info
    break;
    case "f":
      // list parents
      let parentsNames = [];
      let myPersonsParentsID = [];
      myPersonsParentsID = person[0].parents;
      if(myPersonsParentsID.length >1){
        let p1 = myPersonsParentsID[0];
        let p2 = myPersonsParentsID[1];
        let p1Name = people.filter(function(el){
          return (el.id == p1);
        })
        let p2Name = people.filter(function(el){
          return (el.id == p2);
        })
        parentsNames = [p1Name, p2Name];
      }
      else{
        parentsNames = people.filter(function(el){
          return (el.id == myPersonsParentsID);
        })
      }
      if (parentsNames.length == 1){
        console.log("This is your person's parent:");
        console.log(parentsNames);
      }
      else if (parentsNames.length == 2){  
        console.log("These are your person's parents:");
        console.log(parentsNames);
      }  
      else {
        console.log("Your person does not have any parents in this database");
      }

      // list siblings
      let myId = person[0].id;
      let siblingsNames = people.filter(function(el){
        return (el.parents[0] == myPersonsParentsID[0] && el.id != myId && person[0].parents.length != 0);
      })
      if (siblingsNames.length > 1){
        console.log("These are your person's siblings:");
        console.log(siblingsNames);
      }
      else if (siblingsNames.length == 1){
        console.log("This is your person's sibling:");
        console.log(siblingsNames);
      }
      else {
        console.log("Your person does not have siblings in this database");
      }

      // list spouse
      let myPersonsSpouseID = person[0].currentSpouse;
      let spouseName = people.filter(function(el){
        return (el.id == myPersonsSpouseID);
      })
      if (spouseName.length == 1){
        console.log("This is your person's spouse:");
        console.log(spouseName);
      }
      else {
        console.log("Your person is single and ready to mingle");
      }
      // console.log(spouseName.firstName);

      

    // TODO: get person's family
    break;
    case "d":
      let personId = person[0].id;
      let parentId;
      let parentIdTwo;
      let result = people.filter(findKids)
        function findKids(el){
          parentId = el.parents[0];
          parentIdTwo = el.parents[1];
          if (personId == parentId || personId == parentIdTwo){
            return true;
          }
          // return findKids;
        }
        console.log(result);

      //console.log()
      // TODO: get person's descendants
      // Create a recursive function and what the function will do will create a variable w/ persons ID#, 
      // filter out any object that doesn't have our persons ID in the parents field 
      // at the end of the function, we'll call the function again for a new array ("kids array"), this will 
      // compare their ID#s to all other objects in the data/first array.
      // if array.lenght is >0 then we'll run the function. When there isn't grandkids/great grandkids it will stop the loop.
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}


/// test this git hub
/// shoudln;t print to console - alert like alert on 271
/// create a funcion with 5 level seeacing, call that function in the "no" case
// function find family
