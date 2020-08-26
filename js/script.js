function addInsertListener() {

  var target = $('#add');
  target.click(insertTask);
}


// aggiungi task
function insertTask() {

  var target = $('#task_text');
  var text = target.val();

  $.ajax({

    url: 'http://157.230.17.132:3012/todos',
    method: 'POST',

    data:{
        text: text
    },
    success: function (data) {

      console.log('data', data);
      getTasks();
    },
    error: function (err) {

      console.log('err', err);
    }

  });
}


// cancella task
function addDeleteListener() {

  $(document).on('click', '.click', deleteTask);
}

function deleteTask() {

  var button = $(this);
  var id = button.data('id');

  $.ajax({

    url: `http://157.230.17.132:3012/todos/${id}`,
    method: 'DELETE',

    success: function (data) {

      console.log('data', data);
      getTasks();
    },
    error: function (err) {

      console.log('err', err);
    }
  });
}

// leggi tasks
function getTasks() {

  $.ajax({

    url: 'http://157.230.17.132:3012/todos',
    method: 'GET',

    success: function (data) {
      printTasks(data);
    },

    error: function (err) {
      console.log('err', err);
    }
  });

}

// stampa tasks
function printTasks(tasks) {

  var target = $('#tasks');
  target.text('');

  for (var i = 0; i < tasks.length; i++) {

    var task = tasks[i];
    target.append(`<li>${task.text} - <span data-id="${task.id}" class="click"><b>x</b></span></li>`)

  };
}







function init() {
  getTasks();
  addInsertListener();
  addDeleteListener();
  
}


$(document).ready(init);
