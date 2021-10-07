npm install nodemon -D
npm install --save sequelize
npm install --save pg pg-hstore
npm install bcrypt -S
node_modules/.bin/sequelize init

npx sequelize-cli model:generate --name User --attributes email:string,password:string,picture:string

npx sequelize-cli model:generate --name Comment --attributes content:text,VideoId:integer

npx sequelize-cli model:generate --name Video --attributes title:string,likeCount:integer,views:integer,thumbnail:string,isPrivate:boolean,category:string,UserId:integer

npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name insert-user
npx sequelize-cli seed:generate --name insert-video
npx sequelize-cli seed:generate --name insert-comment

npx sequelize-cli db:seed:all