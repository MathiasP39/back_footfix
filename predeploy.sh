#!/bin/bash
node ace db:wipe
node ace migration:run --force
node ace db:seed 