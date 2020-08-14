# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
# RUN npm install yarn -g
RUN npm install react-scripts@latest -g
RUN yarn

# add app
COPY . ./

# start app
CMD [ "yarn", "start" ]