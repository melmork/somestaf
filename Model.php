<?php

/**
 * Created by PhpStorm.
 * User: home
 * Date: 20.12.2016
 * Time: 22:31
 */
class Model
{

    function dbConection()
    {
        $dsn = "mysql:dbname=" . DBNAME . ";host=" . HOST;
        $dbh = new \PDO($dsn, USER, PASSWORD, [
            \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
        ]);
        return $dbh;
    }

    function getUsers(){
        $dbConect = $this->dbConection();
        $stmt = $dbConect->prepare('SELECT * FROM users ORDER BY id ASC');
        $stmt->execute();
        $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $users;
    }

    function getOneUser($key, $value){
        $dbConect = $this->dbConection();
        $stmt = $dbConect->prepare("SELECT * FROM users WHERE " . $key . "= '" . $value . "' ");
        $stmt->execute();
        $oneUser = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $oneUser;
    }

    function addUser($var, $values){
        $dbConect = $this->dbConection();
        $stmt = $dbConect->prepare('INSERT INTO users (' . $var . ') VALUES (' . $values . ')');
        $stmt->execute();
    }

    function deleteUser($id){
        $dbConect = $this->dbConection();
        $stmt = $dbConect->prepare('DELETE FROM users WHERE id= ' . $id . ' ');
        $stmt->execute();
    }

    function editUser($request, $id){
        $dbConect = $this->dbConection();
        $stmt = $dbConect->prepare("UPDATE users SET " . $request . " WHERE id=" . $id . " ");
        $stmt->execute();
    }

}