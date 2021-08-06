
#!/bin/bash

if [[ ! "${#}" == 2 ]] ; then
    echo "Please provide input and output directories, and no other arguments."
    exit 1
fi

input="${1}"
output="${2}"

find "${input}" -type f | \
while read file ; do
    echo "processing ${file} a $input b $output"
    outname=$(echo "${file}" | sed 's|'"${input}"'|'"${output}"'|g')
    
    echo out $outname
    outdir=$(dirname "${outname}")
    if [[ ! -d "${outdir}" ]] ; then
        mkdir -p "${outdir}"
    fi

    sips -s format jpeg -Z 500 "${file}" --out "${outname}_thumb.jpg"
done
