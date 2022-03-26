rm -fr dist
rm dist.tar.gz dist

npm run build

tar cvzf dist.tar.gz dist

rm -fr dist
