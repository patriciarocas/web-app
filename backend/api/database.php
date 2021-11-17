<?php
include_once 'connect.php';

$queries = array( // declare here all the queries
    'recipe'         => 'select * from recipe',
    'new-recipe'     => 'insert into recipe(name_recipe, ingredients, description, macros, image) values(?, ?, ?, ?, ?)',
    'set-recipe'     => 'update recipe set name_recipe=?, ingredients=?, description=?, macros=?, image=? where id_recipe=?',
    'remove-recipe'  => 'delete from recipe where id_recipe = :id_recipe '
); 

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
                array_shift($_POST);
                $values = $_POST;
            }
            foreach ($values as $key => $value) {
                $params[]=$value;
            }
         //   echo "PARAMS   : ", $params, "   QUERY   : ", $query;
            mysql::query($query, $params);
        } else {
            mysql::query($query);
        }
        exit();
    }
    next($queries);
}
