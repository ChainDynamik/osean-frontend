#!/bin/bash
npx tsc cloud.ts --skipLibCheck

# Remove var Parse = require("parse/node"); from cloud.js
sed -i '' '/var Parse = require("parse\/node");/d' cloud.js

echo "Cloud code compiled successfully"

code cloud.js
