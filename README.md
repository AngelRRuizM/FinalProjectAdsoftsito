# FinalProjectAdsofsito

To setup the node_modules folder and project files:

    npm install
    sudo npm install -g sequelize-cli
    sequelize init

To create de database in postgres
    sudo - u postgres psql
    tu contraseña de admin 
    CREATE USER name WITH PASSWORD 'password' NOCREATEDB;
    CREATE DATABASE namedb;
    GRANT ALL PRIVILEGES ON DATABASE namedb TO name;

To acces te database as that user 
    psql -d namedb -U name
If that doesn not work try:
    cd /etc/postgresql/9.x/main (change the x for the actual number i 9.x)
    sudo nano pg_hba.conf
    change this file 
    from 
        # TYPE DATABASE USER ADDRESS METHOD
        local  all      all          peer
    to
        # TYPE DATABASE USER ADDRESS METHOD
        local  all      all          md5
    Try again
Change config/config.json username, password and database

        
-----------------------------
MODEL FILES
_____________________________

To create a new model and migration file for a new table with SequelizeCli, use: 
    
    sequelize model:create --name table_name --attributes "column1_name:column1_type, column2_name:column2_type,..."

A model is the file that tells sequelize how to manipulate a table. A migration file, is the actual definition that gets translated into Postgres

After the creation of the model, all changes made to it must be manually updated in the migration file as well.

By default, sequelize will make models look for their respective table in plural form. to prevent, you can pass in this an other parameters on model definition, like so:

  var Bar = sequelize.define('Bar', { /* bla */ }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'my_very_custom_table_name'
  });

-----------------------------
MIGRATION FILES
_____________________________

The "up" function performs a modification on the database, that could be reverted with the "down" function, in case we want to undo a migration. For example, a table creation in the "up" function needs the "down" function to drop that table.

Sequelize only migrates files once, so migration files cannot be updated, another migration file must be created to perform any modifications to the database. See query interface's methods:
http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html 

This command generates an independent squeleton migration file:
    
    sequelize migration:create --name file_name

To perform the migration for unmigrated files, use:
    
    sequelize db:migrate

Automatically, Sequelize adds an id, createdAt and updatedAt columns. The id can be renamed or discarded if we do not want a primary key, just remember to reflect those changes on the model file. Both date colums are managed by Sequelize and by default, will generate an error if no present. 

To return the dabase to its initial state, use:

  sequelize db:migrate:undo:all

Alternatively, use:

  sequelize db:drop

But remember to have the credentials in the config.json file, for the user that created the database locally. Then, recreate the database with: 

sequelize db:create