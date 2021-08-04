FROM node:14-alpine3.14

COPY backend /code/backend
COPY dist /code/dist

CMD [ "node", "/code/backend/dist/app.js" ]
