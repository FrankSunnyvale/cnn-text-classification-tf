FROM kadirahq/meteord:base
RUN npm install uglify-js -g
ADD token_server.tar.gz /bundle/
RUN mv /bundle/bundle /built_app

RUN rm -rf /built_app/programs/server/npm/node_modules/meteor/npm-container/node_modules/http-request/
WORKDIR /built_app/programs/server/npm/node_modules/meteor/npm-container/node_modules
RUN npm install http-request@0.7.0
WORKDIR /built_app/programs/server
RUN npm i
#RUN npm install bcrypt
RUN rm -rf /bundle
RUN node -v
RUN ls -alh

WORKDIR /built_app/
RUN find ./programs/server/app/ -name '*.js' -exec /opt/nodejs/bin/uglifyjs --compress -o {} -- {} \;
RUN find ./programs/server/packages/ -name '*.js' -exec /opt/nodejs/bin/uglifyjs --compress -o {} -- {} \;
RUN /opt/nodejs/bin/uglifyjs --compress -o ./programs/server/boot.js -- ./programs/server/boot.js
