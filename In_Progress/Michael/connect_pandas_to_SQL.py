# rds_connection_string = "<insert user name>:<insert password>@localhost:5432/customer_db"
rds_connection_string = "postgres:delphicitb969@localhost:5432/Project_Two"
engine = create_engine(f'postgresql://{rds_connection_string}')