$(document).ready(function() {
    taskDescrArr = new Array(9);
   /* moment.js*/ 
    function getMomentNow () {
        const headerDateTime = moment().format('dddd [, ] MMMM Do');
        $('#currentDay').text(headerDateTime);
        let momentHour = moment().format('H')
        momentHour = Number(momentHour);
        return momentHour;
    }

    let $dailyPlannerContainer = $('#dailyPlannerContainer');

    function createGridSystem() {
        /* 8hour work day for loop */
        for (var hourOfDay = 9; hourOfDay <= 17; hourOfDay++ ){

            let hourIndex = hourOfDay - 9;

            let $rowContainer = $("<div></div>")
            .addClass ('row')
            .addClass('nonBootStrapRow')
            .attr('hour-Index',hourOfDay);
            /*hour column*/
            var $columnHour = $("<div></div>")
            .addClass("col-md-2 hour time-block")

            let $columnHourSpan = $('<span></span>')

            let $columnHourly = "";

            switch(hourOfDay) {
                case 9: case 10: case 11:
                    columnHourly = hourOfDay + "AM";
                    break

                case 12:
                    columnHourly = hourOfDay + "PM";
                    break
                
                default:
                    columnHourly = (hourOfDay-12) + "PM"
                    break

            }
            
            $columnHour.text(columnHourly);
            /* task column*/
            let $descriptionColumn = $("<div></div>")
            .addClass("col-md-9");

            let $descriptionColumnSpan = $("<input></input>")
            .addClass('description taskDescriptionSpan')
            .attr('type', 'text')
            .attr('id',`input-${hourIndex}`)
            .attr('hour-index', hourIndex);

            
            $descriptionColumnSpan.val(taskDescrArr[hourIndex]);
            
            /* save button column */
            let $saveButtonColumn = $("<div></div>")
            .addClass('col-md-1 saveBtn')

            let $saveBtnIcon = $("<i></i>")
            .addClass('fas fa-save btn-save')
            .attr('id', `saveid-${hourIndex}`)
            .attr('save-id', hourIndex);

            /* append to DOM */
            $rowContainer.append($columnHour);

            $rowContainer.append($descriptionColumn);

            $descriptionColumn.append($descriptionColumnSpan);

            $rowContainer.append($saveButtonColumn);

            $saveButtonColumn.append($saveBtnIcon);



            $dailyPlannerContainer.append($rowContainer);

        };
    };

    function getTaskDetails() {
        let localStorageTasks = JSON.parse(localStorage.getItem("dailyTasks"));

        if (localStorageTasks === null) {
            taskDescrArr = new Array(9);
        }
        else {
            taskDescrArr = localStorageTasks;
            console.log("Values from local storage are:" + taskDescrArr);
        };
    };

    function taskRowColor () {
        momentHour = getMomentNow ()

        for (var i = 0; i < 9; i++) {
            let hourIndex = $("#input-" + i).attr("hour-index");
            hourIndex = Number(hourIndex);
            hourIndex += 9;

            if (hourIndex < momentHour) {
                $("#input-" + i).css("background-color", "lightgrey");
            } else if (hourIndex > momentHour) {
                $("#input-" + i).css("background-color","#77dd77");
            } else {
                $("#input-" + i).css("background-color","#ff6961");
            }
        };
    };

    $(document).on('click','i',function(event){
        event.preventDefault();

        let $localStorageIndex = $(this).attr('save-id');

        taskDescrArr[$localStorageIndex] = $("#input-" + $localStorageIndex).val();

        $("#input-" + $localStorageIndex).css("outline: #4CAF50 solid 10px");

        localStorage.setItem("dailyTasks", JSON.stringify(taskDescrArr));
    });


    getMomentNow() /* current time*/
    getTaskDetails(); /* stores array from local storage to array */
    createGridSystem(); /*grid system*/
    taskRowColor() /* updates tasks colors accordingly */

});