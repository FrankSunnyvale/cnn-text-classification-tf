#!/bin/bash

TARBALL=token_server.tar.gz

git diff .
rm -rf $TARBALL
meteor build --architecture=os.linux.x86_64 ../
mv ../$TARBALL ./

echo "run \"docker build -t frank4000/tokenserver:1.15 .\""
