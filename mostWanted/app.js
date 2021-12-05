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
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let genArray = [];
      let userInputGender = prompt("Enter a gender; 'female' or 'male'; 'n' for Next");
      if (userInputGender == "female" || "male"){
        genArray = people.filter(function(el){
          return (el.gender == userInputGender);
        });
      }
      else if (userInputGender == "n"){
        genArray = people;
      }
      console.log(genArray);

      let heightArray = [];
      let userInputHeight = prompt("Enter the person's height in inches; 'N' for Next"); 
      if (userInputHeight <= "77"){
        heightArray = genArray.filter(function(el){
          return (el.height == userInputHeight);
        });
      }
      else {
        heightArray = genArray;
      }        
      console.log(heightArray);

      let weightArray = [];
      let userInputWeight = prompt("Enter the person's weight in pounds; 'N' for Next");
      weightArray = heightArray.filter(function(el){
        return (el.weight == userInputWeight);
      });

      let eyeArray = [];
      let userInputEye = prompt("Enter the person's eye color; 'N' for Next");
      eyeArray = weightArray.filter(function(el){
        return (el.eyeColor == userInputEye);
      });

      let occArray = [];
      let userInputOccupation = prompt("Enter the person's occupation; 'N' for Next");
      occArray = eyeArray.filter(function(el){
        return (el.occupation == userInputOccupation);
      })
      console.log(occArray);




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

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'd' for descendants? Type the option you want, 'restart', or 'quit'");

  switch(displayOption){
    case "info":
      console.log(person[0])
    // TODO: get person's info
    break;
    case "family":
      console.log(person[0].parents)
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