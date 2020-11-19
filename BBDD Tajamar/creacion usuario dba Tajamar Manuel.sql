create user 'dbaTajamarManuel'@'%' IDENTIFIED WITH mysql_native_password BY 'WhatEverPass';
grant all privileges on posttajamar.* to 'dbaTajamarManuel';
flush privileges;