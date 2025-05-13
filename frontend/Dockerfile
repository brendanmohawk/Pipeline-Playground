
# Dockerfile - frontend

# Uses Nginx as the base image (serves static files)
FROM nginx:alpine 

# Remove any default nginx contents
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files to nginx public dir
COPY . /usr/share/nginx/html 

# Expose web port default
EXPOSE 80
