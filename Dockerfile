FROM node:18

WORKDIR /app

# install python + pip
RUN apt-get update && apt-get install -y python3 python3-pip

# copy project files
COPY . .

# install node packages
RUN npm install

# install python packages
RUN pip3 install -r requirements.txt

# install spacy model
RUN python3 -m spacy download en_core_web_sm

EXPOSE 5000

CMD ["node", "backend/server.js"]