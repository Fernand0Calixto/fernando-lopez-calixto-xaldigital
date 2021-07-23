FROM centos

# install node
RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -
RUN yum install nodejs -y

# copy data ingestion to container
WORKDIR '/data-ingestion'
COPY data-ingestion .
RUN npm install

# copy rest server to container
WORKDIR '/rest-server'
COPY rest-server .
RUN npm install

WORKDIR '/'

# run server
CMD node rest-server/index.js
