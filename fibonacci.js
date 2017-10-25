'use strict';
// Attach a directly bound event handler
$("#generate-fibnoacci-series").on("click", function(event) {
    var $form = $('#nvidia-fibonacci-form').parsley();
    var isValid = $form.validate();
    // proceed only if there is no parsley error
    if (isValid) {
        var inputNumber = $('#inputNumber').val();
        let fibArray = [0, 1];
        for (var i = 2; i <= inputNumber; i++) {
            fibArray.push(fibArray[i - 1] + fibArray[i - 2]);
        }
        var dataView;
        var grid;
        var data = [];
        var columns = [{
                id: "number",
                name: "Number",
                field: "number",
                width: 120,
                headerRowHeight: 30,
                cssClass: "cell-title",
            },
            {
                id: "fibonacciSeries",
                name: "Fibonacci Series",
                field: "fibonacciSeries",
                width: 300,
                headerRowHeight: 30,
                cssClass: "cell-title"
            }
        ];
        var options = {
            enableColumnReorder: false,
            rowHeight: 30,
            autoHeight: true,
        };
        $(function() {
            for (var i = 0; i <= inputNumber; i++) {
                var d = (data[i] = {});
                // this is the unique is for each element
                d.id = "id_" + i;
                d["number"] = i;
                d["fibonacciSeries"] = fibArray[i];
            }
            //create slick grid data view
            var dataView = new Slick.Data.DataView();
            grid = new Slick.Grid("#nvidia-fibnoacci-grid", dataView, columns, options);
            // update grid on row count change.
            dataView.onRowCountChanged.subscribe(function(e, args) {
                grid.updateRowCount();
                grid.render();
            });
            dataView.beginUpdate();
            dataView.setItems(data);
            dataView.endUpdate();
            $('#nvidia-fibnoacci-grid').removeClass('display-none');
        });
    }
});
//reset the form on click of reset button
$('#reset-to-blank').on('click', function(event) {
    $('#nvidia-fibonacci-form').parsley().reset();
    $("#nvidia-fibonacci-form")[0].reset();
    $('#nvidia-fibnoacci-grid').addClass('display-none');
});