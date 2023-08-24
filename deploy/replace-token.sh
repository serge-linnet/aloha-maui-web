# $1 - token
# $2 - value
# $3 - file
echo "Replacing $1 with $2 in $3"
sed -i -e "s/'$1'/'$2'/g" $3