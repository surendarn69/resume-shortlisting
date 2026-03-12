FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# install python + pip
RUN apt-get update && apt-get install -y python3 python3-pip

COPY . .

# install python libraries
RUN pip3 install -r requirements.txt

# install spacy model
RUN python3 -m spacy download en_core_web_sm

EXPOSE 5000

CMD ["node", "server.js"]