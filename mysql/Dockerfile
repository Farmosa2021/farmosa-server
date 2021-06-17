FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE farmosa_db

COPY init.sql /docker-entrypoint-initdb.d/
