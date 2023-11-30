function GetTaskList() {
    $.ajax
        ({
            type: "POST",
            url: "/TaskJob/TaskListJson",
            contentType: "application/json",
            dataType: "json",
            success: function (res, s, e) {

                var tableHtml = '<table id="example" class="table table-striped">';
                tableHtml += '<thead style="text-align:center;">';
                tableHtml += '<tr style="text-align:center;">';
                tableHtml += '<th>Task Id</th>';
                tableHtml += '<th>Task Name</th>';
                tableHtml += '<th>Task Description</th>';
                tableHtml += '<th>Action</th>';
                tableHtml += '</tr>';
                tableHtml += '</thead>';
                tableHtml += '<tbody>';

                $.each(res, function (index, item) {

                    tableHtml += '<tr>';
                    tableHtml += '<td>' + item.taskJobId + '</td>';
                    tableHtml += '<td>' + item.taskName + '</td>';
                    tableHtml += '<td>' + item.taskDescription + '</td>';
                    tableHtml += '<td>';

                    // Edit button
                    tableHtml += '<button class="btn small-button" onclick="EditTaskDetails(' + item.taskJobId + ')">';
                    tableHtml += '<i class="fa fa-edit" aria-hidden="true"></i></button>';

                    // Details button
                    tableHtml += '<button class="btn small-button" onclick="DetailsTask(' + item.taskJobId + ')">';
                    tableHtml += '<i class="fa fa-info-circle" aria-hidden="true"></i></button>';

                    // Delete button
                    tableHtml += '<button class="btn small-button" onclick="DeleteTask(' + item.taskJobId + ')">';
                    tableHtml += '<i class="fa fa-trash" aria-hidden="true"></i></button>';

                    tableHtml += '</td>';
                    tableHtml += '</tr>';
                });

                tableHtml += '</tbody>';
                tableHtml += '</table>';

                $('#table_data').html(tableHtml);

                $('#example').DataTable();


            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }

        })
}

$("#addTask").click(function () {
    ClearTextBox();
    $("#ADD").modal("show");
    $("#Create").css("display", "block");

})

function CreateTask() {

    var taskName = $("#TaskName").val();
    var taskDescription = $("#TaskDes").val();



    if (taskName.length == 0) {
        ShowSweet("Task Name is Empty!", "Please Enter Task Name", "error", "OK");
        return;
    }
    else if (taskDescription.length == 0) {
        ShowSweet("Task Description is Empty!", "Please Enter Task Name", "error", "OK");
        return;
    }


    var objData =
    {
        TaskName: taskName,
        TaskDescription: taskDescription
    }


    $.ajax({
        type: "POST",
        url: "/TaskJob/CreateTask",
        data: JSON.stringify(objData),
        contentType: "application/json",
        dataType: "json",
        success: function () {
            ShowSweet("Data Saved!", "", "success", "OK");
            ClearTextBox();
            GetTaskList();
            HideMain();
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}

function ClearTextBox() {
    $("#TaskName").val("");
    $("#TaskDes").val("");
    $("#TaskId").val("");
}

function HideMain() {
    $("#ADD").modal("hide");
}

function HideDetailsModal() {
    $("#DetailsModal").modal("hide");
}

function DeleteTask(taskJobId) {

    swal({
        title: "Are you sure ?",
        text: "Once deleted, you will not be able to recover this Task !",
        icon: "warning",
        buttons:
        {
            cancel: "Cancel",
            confirm: "Delete"
        },
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/TaskJob/DeleteTask?id=" + taskJobId,
                success: function ()
                {
                    GetTaskList();
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }
            });
        }
        else {
            swal({
                title: "Your Task Is Safe!",
                icon: "success",
                button: "OK",
            });
        }
    });
}

function DetailsTask(taskJobId) {

    $.ajax
        ({
            url: "/TaskJob/DetailsTask?id=" + taskJobId,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (responce) {
                $('#TId').val(responce.taskJobId);
                $('#TName').val(responce.taskName);
                $('#TDes').val(responce.taskDescription);

                $('#DetailsModal').modal('show');
                $("#TaskHeading").text("Details Task");
                $('#TName').prop("disabled", true);
                $('#TDes').prop("disabled", true);
                $('#btnUpdate').css("display", "none");

            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }

        })
}

function EditTaskDetails(taskJobId) {
    $.ajax
        ({
            url: "/TaskJob/EditTask?id=" + taskJobId,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (responce) {
                $('#TId').val(responce.taskJobId);
                $('#TName').val(responce.taskName);
                $('#TDes').val(responce.taskDescription);

                $("#btnUpdate").css("display", "block");
                $("#TaskHeading").text("Edit Task");
                $('#DetailsModal').modal('show');

                $('#TName').prop("disabled", false);
                $('#TDes').prop("disabled", false);

            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }

        })
}

function EditTask()
{
    var taskName = $("#TName").val();
    var taskDescription = $("#TDes").val();

    if (taskName.length == 0)
    {
        ShowSweet("Task Name is Empty!", "Please Enter Task Name", "error", "OK");
        return;
    }
    else if (taskDescription.length == 0)
    {
       
        ShowSweet("Task Description is Empty!", "Please Enter Task Description", "error", "OK");
        return;
    }


    var objData =
    {
        TaskJobId: $("#TId").val(),
        TaskName: taskName,
        TaskDescription: taskDescription
    }

   
    $.ajax
        ({
            url: "/TaskJob/UpdateTask",
            type: "Put",
            /*contentType: "application/x-www-form-urlencoded;charset=utf-8",*/
            contentType: "application/json;charset=utf-8",
            /*data: objData,*/
            data:JSON.stringify(objData),
            datatype: "json",
            success: function ()
            {
                ShowTost("Success", "Task updated successfully.", "success", "top-right", function () {
                    ClearTextBox();
                    /*GetTaskList();*/
                    /*HideDetailsModal();*/

                });
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }

        })
}




