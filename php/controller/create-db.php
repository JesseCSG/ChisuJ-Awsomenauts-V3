<!-- Puts the whole php code for the page into a column-12 -->
<div class="col-xs-12">
<?php

//* Links config.php to this php.
    require_once (__DIR__ . "/../model/config.php");
    
       
//* Makes connection to $query and creates a new table 'posts' to be saved to phpMyAdmin.
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "title varchar(255) NOT NULL,"
            . "post text NOT NULL,"
            . "PRIMARY KEY (id))");
    
//* If $query is true, echo out 'Successfully created table: posts'
    if($query) {
        echo "<p>Successfully created table: posts</p>";
    }
//* If $query is false, then echo out that an error has occurd and show the error.
    else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
    
//* Makes connection to $query and creates a new table 'users' to be saved to phpMyAdmin.
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
             . "id int(11) NOT NULL AUTO_INCREMENT,"
             . "username varchar(30) NOT NULL,"
             . "email varchar(50) NOT NULL,"
             . "password char(128) NOT NULL,"
             . "salt char(128) NOT NULL,"
             . "PRIMARY KEY (id))");
    
//* If the $query is true, then echo out 'Successfully created table: users'.
    if($query) {
        echo "<p>Successfully created table: users</p>";
    }
//* If $query is false, then echo out thatan error has occured and show the error.
    else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
    ?>
</div>
    