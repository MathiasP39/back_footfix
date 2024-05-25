#!/bin/bash
exec node ace db:wipe
exec node ace migration:run --force
exec node ace db:seed 