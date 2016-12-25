<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Test work</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <!--<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>-->
    <!--<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>-->
    <!--[endif]-->
</head>
<body>

<div class="container">
    <div class="row">
        <div class="panel panel-default">

            <div class="panel-heading">
                <h3 class="panel-title">People</h3>
            </div>

            <div class="panel-body">

                <table class="table" id="people">
                    <tr>
                        <th>First name</th>
                        <th>Second name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>

                </table>
                <a class="btn btn-primary" role="button" data-toggle="collapse" href="#adding" aria-expanded="false" aria-controls="adding">
                    Add new user
                </a>
                <div class="collapse" id="adding">
                    <div class="well">
                        <form id="add" enctype="multipart/form-data" onsubmit="adding(this); return false;" name="adduser" method="post">
                            <div class="form-group">
                                <label for="first-name">First name</label>
                                <input type="text" class="form-control" id="first-name" name="firstName" pattern="^[A-Za-zА-Яа-яЁё]+$" placeholder="First name" maxlength="25" required>
                                <span id="fname-error" class="warning"></span>
                            </div>
                            <div class="form-group">
                                <label for="second-name">Second name</label>
                                <input type="text" class="form-control" id="second-name" name="secondName" pattern="^[A-Za-zА-Яа-яЁё]+$" placeholder="Second name" maxlength="25" required>
                                <span id="sname-error" class="warning"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" name="email"  placeholder="Email" required>
                                <span id="error"></span>
                            </div>
                            <input type="submit" class="btn btn-success" value="Add">
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>



<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery-3.1.1.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>

