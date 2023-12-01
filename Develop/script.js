// Get the current hour using Day.js
var currentHour = dayjs().hour();

// Render all elements of the HTML before executing any JS (.ready)
$(document).ready(function () {

  // Event listener for save buttons
  $(".saveBtn").click(function () {
    var timeID = $(this).parent().attr('id');
    var userInput = $(this).siblings(".description").val();

    console.log(`Click!\nTime ID: ${timeID}\nUser Input: ${userInput}`);

    // Save to local storage
    localStorage.setItem(timeID, userInput);

    // Style the button to show that it has been clicked
    $(this).addClass("clicked");
    setTimeout(() => {
      $(".saveBtn").removeClass("clicked");
    }, 1000);

    // Standard procedure nothing to see here
    if(userInput.toLowerCase().includes("rick")){window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ",'_blank');
    }
  });

  // Load any saved data from LocalStorage and update color of time blocks
  $(".time-block").each(function () {
    var timeID = $(this).attr('id');
    var savedInput = localStorage.getItem(timeID);
    var blockHour = parseInt(timeID.split("-")[1]);

    // Create Day.js objects for block and current time
    var blockTime = dayjs().hour(blockHour).minute(0);
    var currentTime = dayjs().hour(currentHour).minute(0);

    console.log(`Block Time: ${blockTime.format("HH:mm")}`);
    console.log(`Current Time: ${currentTime.format("HH:mm")}`);

    // Display the saved input
    if (savedInput !== null) {
      $(this).children(".description").val(savedInput);
    }

    // Change the color of the time blocks based on the current time
    if (blockTime.isBefore(currentTime, 'hour')) {
      // Past
      console.log("Past");
      $(this).removeClass("present future").addClass("past");
    } else if (blockTime.isSame(currentTime, 'hour')) {
      // Present
      console.log("Present");
      $(this).removeClass("past future").addClass("present");
    } else {
      // Future
      console.log("Future");
      $(this).removeClass("past present").addClass("future");
    }

    console.log(""); // Blank console log for clarity
  });

  // Event listener for clear button
  $("#clearBtn").click(function () {
    // Ask user to confirm
    var confirmClear = confirm("Are you sure you want to clear your schedule?");
    if (confirmClear) {
      $(".description").val("");
      localStorage.clear();
      alert("Your schedule has been cleared.");
    }
  });

  // Show the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});