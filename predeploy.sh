#!/bin/bash
echo 'Starting predeploy script...'
node ace migration:run --force
echo 'Migrations complete.'
node ace db:seed 
echo 'Seeding complete.'
echo 'predeploy Complete'