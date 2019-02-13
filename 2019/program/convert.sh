#!/bin/bash

files=$( find . -type f -name '*.html' )
for f in $files; do
    iconv -f windows-1252 -t utf-8 $f > .temp &&
    mv .temp $f
done
rm -f .temp

