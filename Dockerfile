FROM node:10 as contracts

WORKDIR /contracts

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY truffle-config.js truffle-config.js
COPY ./contracts ./contracts
RUN npm run compile

COPY flatten.sh flatten.sh
RUN bash flatten.sh

FROM node:10

WORKDIR /contracts

COPY package.json .
COPY package-lock.json .
RUN npm install --only=prod

COPY --from=contracts /contracts/build ./build
COPY --from=contracts /contracts/flats ./flats

COPY deploy.sh deploy.sh
COPY ./deploy ./deploy

ENV PATH="/contracts/:${PATH}"
ENV NOFLAT=true
