#!/bin/bash

textdir=$1
outdir=$2
format=$3
ext=$4
voice=$5

if [[ ! $textdir ]] || [[ ! $outdir ]]; then
  printf "Usage: ./speak-em-all.sh <directory path with text files> <directory path where audio files go> [format] [output file extension] [voice]";
  exit 1;
fi

for file in ${textdir}/*.txt
do
  filename="${file##*/}"
  newfilename=$(echo "$filename" | sed -r "s/(.*)\.txt/\1/").${ext}
  node speak-em --textFile "${file}" --outFile "${outdir}/${newfilename}" --format "${format}" --voice "${voice}"
done
