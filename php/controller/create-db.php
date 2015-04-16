<!-- Puts the whole php code for the page into a column-12 -->
<div class="col-xs-12">
<?php

//* Links config.php to this php.
    require_once (__DIR__ . "/../model/config.php");
    
       
//* Makes connection to $query and creates a new table 'posts' to be saved to phpMyAdmin.
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "title varchar(255) NOT NULL,"
            . "exp int(4),"
            . "exp1 int(4),"
            . "exp2 int(4),"
            . "exp3 int(4),"
            . "exp4 int(4),"
            . "post text NOT NULL,"
            . "PRIMARY KEY (id))");   
   
//* Makes connection to $query and creates a new table 'users' to be saved to phpMyAdmin.
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
             . "id int(11) NOT NULL AUTO_INCREMENT,"
             . "username varchar(30) NOT NULL,"
             . "email varchar(50) NOT NULL,"
             . "password char(128) NOT NULL,"
             . "salt char(128) NOT NULL,"
             . "PRIMARY KEY (id))");
    
    ?>
</div>
    