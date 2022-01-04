<?php
include_once 'connect.php';

$queries = array( // declare here all the queries
    'recipe'         => 'select * from recipe', //get
    'get-recipeId'   => 'select * from recipe where id_recipe = ?', //get recipe by id
    'new-recipe'     => 'insert into recipe(name_recipe, ingredients, description, macros, image) values(?, ?, ?, ?, ?)', //add
    'update-recipe'  => 'update recipe set name_recipe=?, ingredients=?, description=?, macros=?, image=? where id_recipe=?', //update
    'remove-recipe'  => 'delete from recipe where id_recipe = ? ', //remove
    'get-comm'       => 'select * from user where id_recipe = ?', //get comm
    'add-comm'       => 'insert into user(name_user, email, comments, id_recipe, date) values (?, ?, ?, ?, ?)', //add comm
    'get-admin'      => 'select * from admin where email=? and password=?', //get comm

); 


// echo 'The method is : ',  $_SERVER['REQUEST_METHOD'] == 'GET' ? "GET":"POST", "\n";
// exit();

if (!empty($argv)) { // for debug scenario, command line get params
    parse_str(implode('&', array_slice($argv, 1)), $_GET);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!(array_key_exists("query", $_GET))) { 
        header('HTTP/1.1 400 Bad Request {"query": "param <query> is required"}');
        exit; 
    }
    $queryKey = $_GET["query"];
} else {
    $_POST = json_decode(file_get_contents('php://input'), true);
    if (!(array_key_exists("query", $_POST))) {
        header('HTTP/1.1 400 Bad Request {"query": "param <query> is required"}');
        exit;
    }
    $queryKey = $_POST["query"];
} 

while ($query = current($queries)) {
    if (key($queries) == $queryKey) {
        if (strpos($query, '?') !== false) {
            $params = array();
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                array_shift($_GET);
                $values = $_GET;
            } else {
                // array_shift($_POST);
                unset($_POST['query']); // delete element by key
                $values = $_POST;
            }
            foreach ($values as $key => $value) {
                $params[]=$value;
            }
         // echo "PARAMS   : ", $params, "   QUERY   : ", $query;
            mysql::query($query, $params);
        } else {
            mysql::query($query);
        }
        exit();
    }
    next($queries);
}
