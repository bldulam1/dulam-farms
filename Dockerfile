# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN npm install react-scripts@latest -g
RUN yarn

# add app
COPY . ./

# start app
CMD [ "yarn", "start" ]

# docker build -t dulam-farms:dev .
# docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true dulam-farms:dev