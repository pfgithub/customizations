#!/usr/bin/env bash

set -e

cd docs_gen/compose/deps/../../../docs_gen/bookmarks/../../docs_gen

rm -rf ../docs
mkdir -p ../docs

cp -r compose/public ../docs/x
cd compose
	node composegen.js
cd ..

cd bookmarks
	node bookmarkgen.js
cd ..