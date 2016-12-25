$(document).ready(function(){
    showpeople();


});

function showpeople() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/run', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            } else {
                var res = $.parseJSON(xhr.responseText);
                $.each(res, function (i, answ) {
                    var user = "<tr class=\"newd\">" +
                        "<td class=\"firstName\">"+ answ['firstName'] +"</td>" +
                        "<td class=\"secondName\">" + answ['secondName'] +"</td>" +
                        "<td class=\"email\">"+ answ['email'] +"</td>" +
                        "<td><a href=\"/get/"+ answ['id'] +"\" class=\"btn btn-primary btn-xs get\" >Edit</a>"+
                        "<a href=\"/delete/"+ answ['id'] +"\" class=\"btn btn-danger btn-xs del\">Delete</a></td>" +
                        "</tr>";
                    $('#people').append(user);
                });

            }
        }
    }
}


window.adding = function() {
    var formData = new FormData();
    formData.append('firstName', $('#first-name').val());
    formData.append('secondName', $('#second-name').val());
    formData.append('email', $('#email').val());
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add', true);
    xhr.send(formData);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            } else {
                var answ = $.parseJSON(xhr.responseText);
                if (answ['error']){
                    $('#error').html(answ['error']);
                } else {
                var user = "<tr class=\"newd\">" +
                    "<td class=\"firstName\">"+ answ['firstName'] +"</td>" +
                    "<td class=\"secondName\">" + answ['secondName'] +"</td>" +
                    "<td class=\"email\">"+ answ['email'] +"</td>" +
                    "<td><a href=\"/get/"+ answ['id'] +"\" class=\"btn btn-primary btn-xs get\" >Edit</a>"+
                    "<a href=\"/delete/"+ answ['id'] +"\" class=\"btn btn-danger btn-xs del\">Delete</a></td>" +
                    "</tr>";
                $('#people').append(user);
                $('#first-name').val('');
                $('#second-name').val('');
                $('#email').val('');
                }
            }
        }
    }
};


$('.table').on('click', '.del', function(e) {
    e.preventDefault();
    var path = $(this).attr('href');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            } else {
                $.each($('.newd'),function () {
                    $(this).remove();
                });
                var res = $.parseJSON(xhr.responseText);
                $(this).parent('tr').remove();
                $.each(res, function (i, answ) {
                    var user = "<tr class=\"newd\">" +
                        "<td class=\"firstName\">"+ answ['firstName'] +"</td>" +
                        "<td class=\"secondName\">" + answ['secondName'] +"</td>" +
                        "<td class=\"email\">"+ answ['email'] +"</td>" +
                        "<td><a href=\"/get/"+ answ['id'] +"\" class=\"btn btn-primary btn-xs get\" >Edit</a>"+
                        "<a href=\"/delete/"+ answ['id'] +"\" class=\"btn btn-danger btn-xs del\">Delete</a></td>" +
                        "</tr>";
                    $('#people').append(user);
                });
            }
        }
    }
});

$('.table').on('click', '.get', function(e) {
    e.preventDefault();
    $(".active1").remove();
    var path = $(this).attr('href');
    var per = $(this).parent('td').parent('tr');
    per.attr("id", "active2");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            } else {
                var answ = $.parseJSON(xhr.responseText);
                var correcting = "<tr class=\"active1\">"+
                    "<td><input type=\"text\" id=\"firstName\" value=\""+ answ['firstName'] +"\" class=\"form-control input-sm\">" +
                    "<span id=\"errorf\"></span></td>"+
                    "<td><input type=\"text\" id=\"secondName\" value=\"" + answ['secondName'] +"\" class=\"form-control input-sm\">" +
                    "<span id=\"errors\"></span></td>"+
                    "<td><input type=\"email\" id=\"email\" value=\""+ answ['email'] +"\" class=\"form-control input-sm\"><span id=\"errore\"></span></td>"+
                    "<td><a href=\"/save/"+ answ['id'] +"\" class=\"btn btn-success btn-xs save\">Save</a></td>"+
                    "</tr>";
                    per.after(correcting);
            }
        }
    }
});


$('.table').on('click', '.save', function(e) {
    e.preventDefault();
    $('#errorf').empty();
    $('#errors').empty();
    $('#errore').empty();
    var path = $(this).attr('href');
    var firstname = $('#firstName').val();
    var secondname = $('#secondName').val();
    var email = $('#email').val();
    var errors = {};
    var pattern;
    if (firstname != ''){
        pattern = /^[A-Za-zА-Яа-яЁё]+$/i;
        if(!pattern.test(firstname)){
            errors['f'] = 'Не верное имя';
            $('#errorf').html(errors['f']);
        }
    } else {
        errors['f'] = 'Введите имя';
        $('#errorf').html(errors['f']);
    }
    if (secondname != ''){
        pattern = /^[A-Za-zА-Яа-яЁё]+$/i;
        if(!pattern.test(secondname)){
            errors['s'] = 'Не верная фамилия';
            $('#errors').html(errors['s']);
        }
    }else {
        errors['s'] = 'Введите фамилию';
        $('#errors').html(errors['s']);
    }
    if (email != ''){
        pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)){
            errors['e'] = 'Не вырный емеил';
            $('#errore').html(errors['e']);
        }
    }else {
        errors['e'] = 'Введите емеил';
        $('#errore').html(errors['e']);
    }
    if ($.isEmptyObject(errors)){
        var formData = new FormData();
        formData.append('firstName', firstname);
        formData.append('secondName', secondname);
        formData.append('email', email);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', path, true);
        xhr.send(formData);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) {
                    console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
                } else {
                    var answ = $.parseJSON(xhr.responseText);
                    if (answ['error']){
                        $('#errore').html(answ['error']);
                    } else {
                        var user = "<td class=\"firstName\">"+ answ['firstName'] +"</td>" +
                            "<td class=\"secondName\">" + answ['secondName'] +"</td>" +
                            "<td class=\"email\">"+ answ['email'] +"</td>" +
                            "<td><a href=\"/get/"+ answ['id'] +"\" class=\"btn btn-primary btn-xs get\" >Edit</a>"+
                            "<a href=\"/delete/"+ answ['id'] +"\" class=\"btn btn-danger btn-xs del\">Delete</a></td>";
                        $('#active2').html(user);
                        $(".active1").remove();
                        $(".newd").removeAttr("id");
                    }
                }
            }
        }
    }

});























