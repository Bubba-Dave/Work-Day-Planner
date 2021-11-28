$(document).ready(function() {
    taskDescrArr = new Array(9);

    function getMomentNow () {
        const headerDateTime = moment().format('dddd [, ] MMMM Do');
        $('#currentDay').text(headerDateTime);
        let momentHour = Number(momentHour);
        return momentHour;
    }

    let $dailyPlannerContainer = $('#dailyPlannerContainer');
    function createGridSystem() {
        for (var hourOfDay = 9; hourOfDay <= 17; hourOfDay++){
            let hourIndex = hourOfDay - 9;

            let $rowContainer = $("<div></div>")
            .addClass('nonBootStrapRow')
            .attr('hour-Index',hourOfDay);

            var $columnHour = $("<div></div>")
            .addclass("col-md-2 hour time-block")
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

            

        }
    }
}