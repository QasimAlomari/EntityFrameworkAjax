* instructions for running the application locally:
   
	1 - From Tools 
	2 - NuGet Package Manager
	3 - Package Manager Console (Show cmd)
	4 - write a cmd command (add-migratin name of migration ex(add-migratin NewTask)) => this process to create migration
	5 - when he finish write another command (update-database) => this process to create database 

	- I added the database file in the project file name Task.bak
		 * (if you want to change name of database go to appsettings.json file from ConnectionStrings 
			from Initial Catalog add the new name)
		 * (if not just restore database in sql server)