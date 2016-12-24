<?php

require 'config.php';
require 'Model.php';

class Controller
{

    function run(){
        $users = new Model;
        $users = $users->getUsers();
        header('Content-type: application/json');
        echo json_encode($users);
    }


    function add(){
        if (!empty($_POST)){
            $var = '';
            $values = '';
            foreach ($_POST as $key => $value) {
                $var .= $key . ',';
                $values .= "'" . $value . "'" . ",";
            }
            $var = substr($var, 0, -1);
            $values = substr($values, 0, -1);
            $add = new Model();
            $add->addUser($var, $values);
            $user = new Model();
            $user = $user->getOneUser('email', $_POST['email']);
            header('Content-type: application/json');
            echo json_encode($user);
        }
    }

    function get($id){
        $get = new Model;
        $get = $get->getOneUser('id', $id);
        header('Content-type: application/json');
        echo json_encode($get);
    }

    function delete($id){
        $delete = new Model;
        $delete->deleteUser($id);
        $users = new Model;
        $users = $users->getUsers();
        header('Content-type: application/json');
        echo json_encode($users);
    }

    function save($id){
        $edit = new Model;
        $request = '';
        foreach ($_POST as $key => $value) {
            $request .= $key . "=" . "'" . $value . "'" . ",";
        }
        $request = substr($request, 0, -1);
        $edit->editUser($request, $id);
        $get = new Model;
        $get = $get->getOneUser('id', $id);
        header('Content-type: application/json');
        echo json_encode($get);
    }

}