#!/bin/sh
set -e

# Run migrations
node ace migration:run --force

# Seed the database
node ace db:seed

# Start the application
exec node ./bin/server.js