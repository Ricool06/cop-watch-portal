#!/usr/bin/env bash

cat << EOF > ~/.aws/config
[default]
region = eu-west-1
EOF

cat << EOF > ~/.aws/credentials
[default]
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
EOF

chmod 600 ~/.aws/*
