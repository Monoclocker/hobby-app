# Используем официальный образ Node.js
FROM node:alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
# COPY react-app

# Собираем приложение
RUN npm run build

# Создаем новый образ, начиная с nginx, для развертывания собранного приложения
#FROM nginx:alpine
#
## Копируем собранное приложение из предыдущего этапа в рабочую директорию Nginx
#COPY --from=builder /app/build /usr/share/nginx/html
#
## Позволяем nginx слушать порт 80
#EXPOSE 80

# Команда для запуска nginx внутри контейнера
RUN npm run

#ENTRYPOINT ["top", "-b"]